/**
 * Waitlist persistence abstraction.
 *
 * The rest of the app talks to a small `WaitlistStore` interface and never
 * knows or cares where data lands. Two adapters ship today:
 *
 *   1. FileStore  — zero-config development fallback. Writes to a local JSON
 *                   file under `.data/waitlist.json` (gitignored). Used whenever
 *                   DATABASE_URL is not set.
 *
 *   2. PostgresStore — used when DATABASE_URL is set. Works with any Postgres
 *                   provider (Supabase, Neon, RDS...). Requires the optional
 *                   `pg` package (`npm install pg`). See README for the schema.
 *
 * To add another backend (e.g. an HTTP form service), implement WaitlistStore
 * and wire it into `getWaitlistStore()`.
 *
 * This module is server-only. It must never be imported into client components.
 */

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { NormalizedWaitlistEntry } from "./validation";

export type AddResult = { status: "created" | "duplicate" };

export interface WaitlistStore {
  /** Persists an entry. Returns "duplicate" if the email already exists. */
  add(entry: NormalizedWaitlistEntry): Promise<AddResult>;
}

interface StoredEntry extends NormalizedWaitlistEntry {
  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/* File store (development fallback)                                          */
/* -------------------------------------------------------------------------- */

class FileStore implements WaitlistStore {
  private readonly dir = path.join(process.cwd(), ".data");
  private readonly file = path.join(this.dir, "waitlist.json");
  // Serialize writes within a single server instance to avoid clobbering.
  private queue: Promise<unknown> = Promise.resolve();

  private async readAll(): Promise<StoredEntry[]> {
    try {
      const raw = await fs.readFile(this.file, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as StoredEntry[]) : [];
    } catch {
      return [];
    }
  }

  add(entry: NormalizedWaitlistEntry): Promise<AddResult> {
    const run = this.queue.then(async (): Promise<AddResult> => {
      const all = await this.readAll();
      if (all.some((e) => e.email === entry.email)) {
        return { status: "duplicate" };
      }
      all.push({ ...entry, createdAt: new Date().toISOString() });
      await fs.mkdir(this.dir, { recursive: true });
      await fs.writeFile(this.file, JSON.stringify(all, null, 2), "utf8");
      return { status: "created" };
    });
    // Keep the chain alive even if one write rejects.
    this.queue = run.catch(() => undefined);
    return run;
  }
}

/* -------------------------------------------------------------------------- */
/* Postgres store (production)                                                */
/* -------------------------------------------------------------------------- */

class PostgresStore implements WaitlistStore {
  private poolPromise: Promise<PgPoolLike> | null = null;

  constructor(private readonly connectionString: string) {}

  private async getPool(): Promise<PgPoolLike> {
    if (!this.poolPromise) {
      this.poolPromise = (async () => {
        // `pg` is an optional dependency. The `webpackIgnore` comment keeps the
        // bundler from trying to resolve it at build time, so the package only
        // needs to exist at runtime when DATABASE_URL is actually configured.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- optional dependency, not resolved at build time
        const pg = await import(/* webpackIgnore: true */ "pg").catch(() => {
          throw new Error(
            "DATABASE_URL is set but the 'pg' package is not installed. Run `npm install pg`.",
          );
        });
        const Pool = (pg as { Pool: new (c: unknown) => PgPoolLike }).Pool;
        const pool = new Pool({
          connectionString: this.connectionString,
          // Most hosted Postgres providers require TLS.
          ssl: { rejectUnauthorized: false },
        });
        await pool.query(SCHEMA_SQL);
        return pool;
      })();
    }
    return this.poolPromise;
  }

  async add(entry: NormalizedWaitlistEntry): Promise<AddResult> {
    const pool = await this.getPool();
    const res = await pool.query(
      `INSERT INTO waitlist_signups (email, first_name, organization, use_case, referral_code)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [
        entry.email,
        entry.firstName,
        entry.organization,
        entry.useCase,
        entry.referralCode,
      ],
    );
    return { status: res.rowCount && res.rowCount > 0 ? "created" : "duplicate" };
  }
}

// Minimal structural type for the bits of `pg.Pool` we use, so we don't need
// `@types/pg` installed for the project to typecheck.
interface PgPoolLike {
  query(
    text: string,
    params?: unknown[],
  ): Promise<{ rowCount: number | null; rows: unknown[] }>;
}

/** Schema, created on first use. Also documented in the README. */
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  first_name    TEXT,
  organization  TEXT,
  use_case      TEXT,
  referral_code TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

/* -------------------------------------------------------------------------- */
/* Store selection                                                            */
/* -------------------------------------------------------------------------- */

let cached: WaitlistStore | null = null;

/** Returns the configured waitlist store (Postgres if DATABASE_URL, else file). */
export function getWaitlistStore(): WaitlistStore {
  if (cached) return cached;
  const dbUrl = process.env.DATABASE_URL?.trim();
  cached = dbUrl ? new PostgresStore(dbUrl) : new FileStore();
  return cached;
}

/** True when a real database is configured (used for messaging/diagnostics). */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
