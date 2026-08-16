/**
 * Decorative QR-style graphic rendered from a fixed pattern. It is intentionally
 * NOT a scannable code — it stands in for the real join code in product mockups.
 * Deterministic (no randomness) so server and client markup match exactly.
 */

// A hand-picked 11x11 module pattern that reads as a believable QR code.
const PATTERN = [
  "11111011111",
  "10001010001",
  "10111010111",
  "10111010101",
  "10001011101",
  "11111000101",
  "00000110100",
  "11101011011",
  "10101110001",
  "10011010110",
  "11101011111",
];

export function QrCode({ className = "" }: { className?: string }) {
  const size = PATTERN.length;
  const cell = 8;
  const quiet = 8;
  const dim = size * cell + quiet * 2;

  return (
    <svg
      viewBox={`0 0 ${dim} ${dim}`}
      className={className}
      role="img"
      aria-label="QR code to join the table"
      shapeRendering="crispEdges"
    >
      <rect width={dim} height={dim} rx="10" className="fill-white" />
      {PATTERN.flatMap((row, y) =>
        row.split("").map((v, x) =>
          v === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={quiet + x * cell}
              y={quiet + y * cell}
              width={cell}
              height={cell}
              className="fill-ink"
            />
          ) : null,
        ),
      )}
      {/* Finder-ring accents at three corners for the classic QR silhouette. */}
      {[
        [quiet, quiet],
        [quiet + (size - 3) * cell, quiet],
        [quiet, quiet + (size - 3) * cell],
      ].map(([x, y], i) => (
        <rect
          key={`f-${i}`}
          x={x - 1}
          y={y - 1}
          width={cell * 3 + 2}
          height={cell * 3 + 2}
          rx="3"
          fill="none"
          className="stroke-ink"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
