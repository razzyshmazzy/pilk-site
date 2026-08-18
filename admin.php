<?php
// Pilk ops dashboard. Single file; secrets live in config.php (gitignored).
// Tabs: Overview (today's volume + profit) · Transactions (filters) ·
// Reviews (later) · Tickets (list + reply via service role).
require __DIR__ . '/config.php';
session_start();

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
if (isset($_GET['logout'])) {
  session_destroy();
  header('Location: admin.php');
  exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_user'])) {
  if (
    hash_equals(ADMIN_USER, $_POST['login_user'] ?? '') &&
    password_verify($_POST['login_pass'] ?? '', ADMIN_PASS_HASH)
  ) {
    $_SESSION['admin'] = true;
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
  } else {
    $login_error = 'Wrong username or password.';
  }
}
$authed = !empty($_SESSION['admin']);

// ---------------------------------------------------------------------------
// Supabase REST helper (service role — server side only)
// ---------------------------------------------------------------------------
function supa(string $method, string $path, $body = null) {
  $ch = curl_init(SUPABASE_URL . '/rest/v1/' . $path);
  $headers = [
    'apikey: ' . SUPABASE_SERVICE_KEY,
    'Authorization: Bearer ' . SUPABASE_SERVICE_KEY,
    'Content-Type: application/json',
    'Prefer: return=representation',
  ];
  curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_TIMEOUT => 15,
  ]);
  if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
  $res = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
  if ($res === false || $code >= 400) return ['__error' => "HTTP $code: " . substr((string) $res, 0, 300)];
  return json_decode($res, true) ?? [];
}

// ---------------------------------------------------------------------------
// Fee model — MUST mirror pilk/domain/fees.ts (tier by per-head spend).
// ---------------------------------------------------------------------------
const TIERS = [
  'everyday'   => ['margin' => 0.011, 'cap' => 1000],
  'upscale'    => ['margin' => 0.014, 'cap' => 2500],
  'fineDining' => ['margin' => 0.018, 'cap' => null],
];
function dining_tier(int $billCents, int $people): string {
  if ($billCents <= 0 || $people <= 0) return 'everyday';
  $ph = $billCents / $people;
  if ($ph >= 7500) return 'fineDining';
  if ($ph >= 5000) return 'upscale';
  return 'everyday';
}
function fee_cents(int $share, string $tier): int {
  if ($share <= 0) return 0;
  $t = TIERS[$tier];
  $target = $t['cap'] === null ? $share * $t['margin'] : min($share * $t['margin'], $t['cap']);
  return (int) round((0.029 * $share + 30 + $target) / 0.971);
}
function net_cents(int $share, string $tier): int {
  $f = fee_cents($share, $tier);
  return $f - (int) round(0.029 * ($share + $f)) - 30;
}
function txn_economics(array $t): array {
  $tier = dining_tier((int) $t['total_cents'], (int) $t['people_count']);
  $fees = 0; $net = 0;
  foreach ($t['transaction_shares'] ?? [] as $s) {
    $fees += fee_cents((int) $s['share_cents'], $tier);
    $net += net_cents((int) $s['share_cents'], $tier);
  }
  return ['tier' => $tier, 'fees' => $fees, 'net' => $net];
}
function money(int $cents): string { return '$' . number_format($cents / 100, 2); }

// ---------------------------------------------------------------------------
// Actions (tickets)
// ---------------------------------------------------------------------------
$notice = null;
if ($authed && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ticket_id'])) {
  if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
    $notice = 'Session expired, try again.';
  } else {
    $reply = trim($_POST['reply'] ?? '');
    $status = in_array($_POST['status'] ?? '', ['answered', 'closed'], true) ? $_POST['status'] : 'answered';
    if ($reply !== '') {
      $r = supa('PATCH', 'support_tickets?id=eq.' . urlencode($_POST['ticket_id']), [
        'reply' => $reply, 'status' => $status, 'replied_at' => gmdate('c'),
      ]);
      $notice = isset($r['__error']) ? 'Reply failed: ' . $r['__error'] : 'Reply sent.';
    }
  }
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
$tab = $_GET['tab'] ?? 'overview';
$range = $_GET['range'] ?? 'today';
$sort = $_GET['sort'] ?? 'recent';

$txns = [];
$tickets = [];
$fetch_error = null;
if ($authed) {
  $since = null;
  if ($range === 'today') $since = date('c', strtotime('today'));
  elseif ($range === '7d') $since = date('c', strtotime('-7 days'));
  $q = 'transactions?select=*,transaction_shares(*)&order=created_at.desc&limit=200';
  if ($since) $q .= '&created_at=gte.' . urlencode($since);
  $txns = supa('GET', $q);
  if (isset($txns['__error'])) { $fetch_error = $txns['__error']; $txns = []; }
  foreach ($txns as $i => $t) $txns[$i]['eco'] = txn_economics($t);
  if ($sort === 'top') usort($txns, fn($a, $b) => $b['total_cents'] <=> $a['total_cents']);
  elseif ($sort === 'profit') usort($txns, fn($a, $b) => $b['eco']['net'] <=> $a['eco']['net']);

  if ($tab === 'tickets') {
    $tickets = supa('GET', 'support_tickets?select=*,profiles(name)&order=created_at.desc&limit=100');
    if (isset($tickets['__error'])) { $fetch_error = $tickets['__error']; $tickets = []; }
  }
}

$todayTotal = 0; $todayNet = 0; $todayFees = 0;
foreach ($txns as $t) {
  $todayTotal += (int) $t['total_cents'];
  $todayNet += $t['eco']['net'];
  $todayFees += $t['eco']['fees'];
}
$tierLabel = ['everyday' => 'Everyday', 'upscale' => 'Upscale', 'fineDining' => 'Fine dining'];
function h(?string $s): string { return htmlspecialchars($s ?? '', ENT_QUOTES); }
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pilk Ops</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  :root { --bg:#0A090E; --card:#16131D; --raised:#201B2B; --border:#2A2536;
          --text:#F4F2F8; --text2:#A9A3B8; --text3:#8A8399;
          --primary:#8B5CF6; --teal:#14B8A6; --red:#EF4444; }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--bg); color:var(--text); font-family:'Sora',sans-serif; min-height:100vh; }
  a { color:var(--primary); text-decoration:none; }
  .wrap { max-width:1080px; margin:0 auto; padding:24px 16px 64px; }
  .topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
  h1 { font-size:28px; }  h2 { font-size:20px; margin-bottom:12px; }
  .mark { width:30px; height:30px; border-radius:50%;
          background:conic-gradient(var(--primary) 0 58deg, var(--bg) 58deg 62deg, var(--primary) 62deg 118deg, var(--bg) 118deg 122deg, var(--primary) 122deg 178deg, var(--bg) 178deg 182deg, var(--primary) 182deg 238deg, var(--bg) 238deg 242deg, var(--primary) 242deg 298deg, var(--bg) 298deg 302deg, var(--primary) 302deg 358deg, var(--bg) 358deg 360deg); }
  .tabs { display:flex; gap:4px; border-bottom:1px solid var(--border); margin-bottom:24px; }
  .tabs a { padding:10px 16px; color:var(--text2); border-bottom:2px solid transparent; }
  .tabs a.active { color:var(--text); border-bottom-color:var(--primary); }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-bottom:24px; }
  .card { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px; }
  .kpi { font-size:32px; font-weight:700; font-variant-numeric:tabular-nums; }
  .kpi.teal { color:var(--teal); }
  .label { font-size:13px; color:var(--text3); margin-bottom:6px; }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th { text-align:left; color:var(--text3); font-weight:400; font-size:12px; padding:8px 10px; border-bottom:1px solid var(--border); }
  td { padding:12px 10px; border-bottom:1px solid var(--border); font-variant-numeric:tabular-nums; }
  tr:last-child td { border-bottom:none; }
  .pill { display:inline-block; padding:2px 10px; border-radius:999px; font-size:12px; background:var(--bg); border:1px dotted var(--text3); color:var(--text2); }
  .pill.upscale { border-color:var(--primary); color:var(--primary); }
  .pill.fineDining { border-color:var(--teal); color:var(--teal); }
  .filters { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
  .filters a { padding:6px 14px; border:1px solid var(--border); border-radius:999px; color:var(--text2); font-size:13px; }
  .filters a.on { border-color:var(--primary); color:var(--text); }
  input, textarea, select, button { font-family:inherit; font-size:15px; color:var(--text);
    background:var(--raised); border:1px solid var(--border); border-radius:12px; padding:12px 14px; }
  button { background:var(--primary); border:none; color:#fff; font-weight:600; cursor:pointer; }
  button:hover { opacity:.9; }
  .login { max-width:360px; margin:15vh auto 0; display:flex; flex-direction:column; gap:12px; }
  .err { color:var(--red); font-size:14px; }
  .notice { background:var(--raised); border:1px solid var(--border); border-radius:12px; padding:12px 16px; margin-bottom:16px; font-size:14px; }
  .ticket { margin-bottom:16px; }
  .ticket .meta { font-size:12px; color:var(--text3); margin-bottom:8px; }
  .ticket p { color:var(--text2); font-size:14px; margin:8px 0; }
  .ticket form { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
  .ticket textarea { flex:1; min-width:240px; min-height:44px; }
  .reply { border-left:3px solid var(--teal); padding-left:12px; }
  .muted { color:var(--text3); font-size:14px; }
</style>
</head>
<body>
<?php if (!$authed): ?>
  <form class="login" method="post" action="admin.php">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="mark"></div><h1>Pilk Ops</h1></div>
    <?php if (!empty($login_error)): ?><div class="err"><?= h($login_error) ?></div><?php endif; ?>
    <input name="login_user" placeholder="Username" autocomplete="username" autofocus>
    <input name="login_pass" type="password" placeholder="Password" autocomplete="current-password">
    <button type="submit">Sign in</button>
  </form>
<?php else: ?>
<div class="wrap">
  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px"><div class="mark"></div><h1>Pilk Ops</h1></div>
    <a href="?logout=1">Sign out</a>
  </div>

  <div class="tabs">
    <?php foreach (['overview' => 'Overview', 'transactions' => 'Transactions', 'reviews' => 'Reviews', 'tickets' => 'Tickets'] as $k => $label): ?>
      <a href="?tab=<?= $k ?>" class="<?= $tab === $k ? 'active' : '' ?>"><?= $label ?></a>
    <?php endforeach; ?>
  </div>

  <?php if ($notice): ?><div class="notice"><?= h($notice) ?></div><?php endif; ?>
  <?php if ($fetch_error): ?><div class="notice err">Supabase error: <?= h($fetch_error) ?></div><?php endif; ?>

  <?php if ($tab === 'overview'): ?>
    <div class="filters">
      <?php foreach (['today' => 'Today', '7d' => 'Last 7 days', 'all' => 'All time'] as $k => $label): ?>
        <a href="?tab=overview&range=<?= $k ?>" class="<?= $range === $k ? 'on' : '' ?>"><?= $label ?></a>
      <?php endforeach; ?>
    </div>
    <div class="cards">
      <div class="card"><div class="label">Money transacted</div><div class="kpi"><?= money($todayTotal) ?></div></div>
      <div class="card"><div class="label">Pilk profit (net of Stripe)</div><div class="kpi teal"><?= money($todayNet) ?></div></div>
      <div class="card"><div class="label">Fee revenue</div><div class="kpi"><?= money($todayFees) ?></div></div>
      <div class="card"><div class="label">Dinners</div><div class="kpi"><?= count($txns) ?></div></div>
    </div>
    <div class="card">
      <h2>Latest dinners</h2>
      <table>
        <tr><th>Restaurant</th><th>When</th><th>Diners</th><th>Tier</th><th>Total</th><th>Pilk net</th></tr>
        <?php foreach (array_slice($txns, 0, 8) as $t): ?>
          <tr>
            <td><?= h($t['title']) ?></td>
            <td><?= h(date('g:i a', strtotime($t['created_at']))) ?></td>
            <td><?= (int) $t['people_count'] ?></td>
            <td><span class="pill <?= $t['eco']['tier'] ?>"><?= $tierLabel[$t['eco']['tier']] ?></span></td>
            <td><?= money((int) $t['total_cents']) ?></td>
            <td style="color:var(--teal)"><?= money($t['eco']['net']) ?></td>
          </tr>
        <?php endforeach; ?>
      </table>
    </div>

  <?php elseif ($tab === 'transactions'): ?>
    <div class="filters">
      <?php foreach (['today' => 'Today', '7d' => 'Last 7 days', 'all' => 'All time'] as $k => $label): ?>
        <a href="?tab=transactions&range=<?= $k ?>&sort=<?= h($sort) ?>" class="<?= $range === $k ? 'on' : '' ?>"><?= $label ?></a>
      <?php endforeach; ?>
      <span style="width:16px"></span>
      <?php foreach (['recent' => 'Recent', 'top' => 'Top amount', 'profit' => 'Top profit'] as $k => $label): ?>
        <a href="?tab=transactions&range=<?= h($range) ?>&sort=<?= $k ?>" class="<?= $sort === $k ? 'on' : '' ?>"><?= $label ?></a>
      <?php endforeach; ?>
    </div>
    <div class="card">
      <table>
        <tr><th>Restaurant</th><th>Date</th><th>Diners</th><th>Tier</th><th>Total</th><th>Fees charged</th><th>Pilk net</th></tr>
        <?php foreach ($txns as $t): ?>
          <tr>
            <td><?= h($t['title']) ?></td>
            <td><?= h(date('M j, g:i a', strtotime($t['created_at']))) ?></td>
            <td><?= (int) $t['people_count'] ?></td>
            <td><span class="pill <?= $t['eco']['tier'] ?>"><?= $tierLabel[$t['eco']['tier']] ?></span></td>
            <td><?= money((int) $t['total_cents']) ?></td>
            <td><?= money($t['eco']['fees']) ?></td>
            <td style="color:var(--teal)"><?= money($t['eco']['net']) ?></td>
          </tr>
        <?php endforeach; ?>
        <?php if (!$txns): ?><tr><td colspan="7" class="muted">No transactions in this range.</td></tr><?php endif; ?>
      </table>
    </div>

  <?php elseif ($tab === 'reviews'): ?>
    <div class="card">
      <h2>User reviews</h2>
      <p class="muted">Coming soon. Reviews will land here once the app ships its post-dinner rating sheet.</p>
    </div>

  <?php elseif ($tab === 'tickets'): ?>
    <?php foreach ($tickets as $tk): ?>
      <div class="card ticket">
        <div class="meta">
          <?= h($tk['profiles']['name'] ?? 'Unknown diner') ?> ·
          <?= h(date('M j, g:i a', strtotime($tk['created_at']))) ?> ·
          <span class="pill"><?= h($tk['status']) ?></span>
        </div>
        <strong><?= h($tk['subject']) ?></strong>
        <p><?= nl2br(h($tk['message'])) ?></p>
        <?php if (!empty($tk['reply'])): ?>
          <p class="reply"><?= nl2br(h($tk['reply'])) ?></p>
        <?php endif; ?>
        <?php if ($tk['status'] === 'open'): ?>
          <form method="post" action="admin.php?tab=tickets">
            <input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>">
            <input type="hidden" name="ticket_id" value="<?= h($tk['id']) ?>">
            <textarea name="reply" placeholder="Write a reply"></textarea>
            <select name="status"><option value="answered">Answer</option><option value="closed">Answer and close</option></select>
            <button type="submit">Send</button>
          </form>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
    <?php if (!$tickets): ?><div class="card"><p class="muted">No tickets.</p></div><?php endif; ?>
  <?php endif; ?>
</div>
<?php endif; ?>
</body>
</html>
