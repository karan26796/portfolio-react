import React, { useEffect, useState } from "react";
import { GithubLogo, ArrowUpRight, GitCommit } from "@phosphor-icons/react";
import "../styles/GitHubCommitBoard.scss";

const USERNAME = "karan26796";

// GitHub's public REST API has no unauthenticated endpoint for the actual
// contribution calendar (that lives behind the GraphQL API, which needs a
// personal token — not something safe to ship in a public frontend). This
// approximates it from public events instead: real activity, just limited
// to what GitHub's public events feed still has (recent history only).
const CONTRIBUTION_EVENT_TYPES = new Set([
  "PushEvent",
  "PullRequestEvent",
  "IssuesEvent",
  "IssueCommentEvent",
  "CreateEvent",
  "PullRequestReviewEvent",
]);

/* The events feed is paginated at 100 and capped at 300 in total, so this is
   every page there is. It is used only for the loader's day grid now — the
   monthly figures come from the commit search below, which can see back as
   far as it is asked to. */
const MAX_PAGES = 3;
const PER_PAGE = 100;

/** Months the footer's total covers. Not drawn any more — the grid is daily —
    but still fetched, since that total is built from them. */
const MAX_MONTHS = 6;

/** Days in the compact grid, which has a footer column's width to fit. */
const COMPACT_GRID_DAYS = 16;

/**
 * Monthly totals come from the commit search rather than the events feed.
 *
 * The events feed remembers 300 events or 90 days, whichever runs out first —
 * for an active account that was two months, which is no basis for a
 * month-by-month view. `search/commits` takes a date range and answers with an
 * exact count, works unauthenticated, and reaches back as far as GitHub's
 * index goes.
 *
 * Only the current month is ever fetched. A finished month cannot change, so
 * asking again would spend a request to be told what is already known — and
 * the search budget is ten requests a minute for the whole address, against
 * sixty an hour for everything else. Six months at a time would have used more
 * than half of it on every cold load.
 */
const SEARCH_ENDPOINT = "https://api.github.com/search/commits";

/**
 * Months that have already finished, measured on 6 September 2026.
 *
 * These are real counts, not placeholders. They stay correct because a past
 * month's commits are settled — but they only stretch back so far, and as
 * months roll off the front this table needs the odd top-up. What keeps that
 * from being a chore is the store below: each visit records the month it
 * fetched, so a month observed while it was current survives as history
 * without anyone editing this file.
 */
const MONTH_HISTORY: Record<string, number> = {
  "2026-04": 0,
  "2026-05": 0,
  "2026-06": 9,
  "2026-07": 22,
  "2026-08": 111,
};

/** Months this browser has seen for itself, newest values winning. */
const MONTHS_STORE_KEY = "github-monthly-commits";
/** How long a fetched current month is trusted before asking again. */
const CURRENT_MONTH_TTL_MS = 6 * 60 * 60 * 1000;

interface MonthStore {
  counts: Record<string, number>;
  /** When the current month was last fetched. */
  fetchedAt: number;
  fetchedKey: string;
}

function readStore(): MonthStore {
  try {
    const raw = localStorage.getItem(MONTHS_STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as MonthStore) : null;
    if (parsed && typeof parsed.counts === "object") return parsed;
  } catch {
    /* Storage blocked or corrupt — fall through to the empty store. */
  }
  return { counts: {}, fetchedAt: 0, fetchedKey: "" };
}

function writeStore(store: MonthStore) {
  try {
    localStorage.setItem(MONTHS_STORE_KEY, JSON.stringify(store));
  } catch {
    /* Nothing to do — the month is simply fetched again next visit. */
  }
}

/** The last day of a month, in UTC — day 0 of the next one. */
const monthEnd = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0));

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Counts for the months on show: stored where they are known, and one request
 * for the month still in progress.
 *
 * A month nobody has a figure for comes back undefined rather than 0. They are
 * different things — one is "no commits", the other is "not known" — and a
 * filled-in zero would quietly claim the first while meaning the second.
 */
async function loadMonthlyCommits(): Promise<{ key: string; count?: number }[]> {
  const now = new Date();
  const store = readStore();
  const currentKey = monthKey(monthStart(now));

  const fresh =
    store.fetchedKey === currentKey && Date.now() - store.fetchedAt < CURRENT_MONTH_TTL_MS;

  if (!fresh) {
    try {
      const start = monthStart(now);
      const query = `author:${USERNAME}+author-date:${isoDay(start)}..${isoDay(monthEnd(start))}`;
      const response = await fetch(`${SEARCH_ENDPOINT}?q=${query}&per_page=1`);

      if (response.ok) {
        const body = await response.json();
        store.counts[currentKey] = body.total_count ?? 0;
        store.fetchedAt = Date.now();
        store.fetchedKey = currentKey;
        writeStore(store);
      }
      // Not ok — rate limited, most likely. Whatever is stored still stands.
    } catch {
      /* Offline. Same again: the stored figures are still the best available. */
    }
  }

  return Array.from({ length: MAX_MONTHS }, (_, i) => {
    const key = monthKey(monthStart(now, MAX_MONTHS - 1 - i));
    // The store first: a month this browser watched go by is more current than
    // anything hard-coded here.
    const count = store.counts[key] ?? MONTH_HISTORY[key];
    return { key, count };
  });
}

interface MonthContribution {
  /** YYYY-MM */
  key: string;
  label: string;
  /** Undefined where no figure is known — which is not the same as zero. */
  count?: number;
  level: number;
}

/** Days, for the loader — the events feed counted differently. */
export interface DayContribution {
  date: string;
  count: number;
  level: number;
}

/** How many days back the loader's grid reaches. Five weeks, so it fills a
    seven-column block exactly. */
export const LOADER_DAYS = 35;

export interface Activity {
  months: MonthContribution[];
  days: DayContribution[];
  /** Commits authored across every month with a known figure. */
  totalCommits: number;
}

interface GitHubCommitBoardProps {
  /** Renders just the contribution cells, without the header or stat banner. */
  compact?: boolean;
}

function eventSize(ev: any): number {
  if (ev.type !== "PushEvent") return 1;
  return ev.payload?.distinct_size ?? ev.payload?.commits?.length ?? ev.payload?.size ?? 1;
}

/* Everything about a month is decided in UTC, because the key is derived from
   an ISO string and that string is UTC.
   Mixing the two put a label and its own tooltip a month apart: `new Date()`
   set to the 1st is local midnight, which in any timezone ahead of UTC is
   still the previous month once toISOString converts it — so a cell keyed
   "2026-08" was labelled "Sept". */
const monthKey = (d: Date) => d.toISOString().slice(0, 7);

/** The first instant of a month, in UTC, `offset` months back from `from`. */
const monthStart = (from: Date, offset = 0) =>
  new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() - offset, 1));

const monthLabel = (d: Date, options: Intl.DateTimeFormatOptions) =>
  d.toLocaleDateString(undefined, { ...options, timeZone: "UTC" });

/**
 * Shading, scaled to the busiest month on show rather than to fixed
 * thresholds.
 *
 * A month holds an order of magnitude more than a day, and what counts as busy
 * depends entirely on the period — the daily thresholds this replaced would
 * have painted every month the darkest green. Zero is always level 0, so an
 * empty month never shades as if something happened in it.
 */
/** Shading for a single day, on fixed thresholds — a day's range is small
    enough that absolute numbers mean something. */
function levelForDay(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function levelForCount(count: number, busiest: number): number {
  if (count <= 0) return 0;
  if (busiest <= 0) return 1;
  return Math.max(1, Math.ceil((count / busiest) * 4));
}

/**
 * One fetch per page load, shared by every board on it.
 *
 * Two of these are mounted at once (the footer and the sidebar), and the
 * unauthenticated API allows 60 requests an hour per address. Three pages
 * times two instances is six requests for one page view, which is a rate limit
 * waiting to happen — so the promise itself is cached at module scope and both
 * instances await the same one.
 */
let activityPromise: Promise<Activity> | null = null;

/**
 * The last day-grid this browser saw, kept so the loader has something true to
 * draw the moment it mounts.
 *
 * The loader is on screen for well under two seconds and the GitHub request
 * rarely returns inside that, so on a cold visit its grid would fill with
 * empty squares — activity-shaped, but not activity. Persisting the previous
 * visit's counts means every visit after the first draws the real thing
 * immediately, and this visit's fetch refreshes the store for the next one.
 *
 * Decoration only: the boards never read this, they wait for the live fetch.
 */
const DAYS_CACHE_KEY = "github-activity-days";

export function readCachedDays(): DayContribution[] | null {
  try {
    const raw = localStorage.getItem(DAYS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DayContribution[]) : null;
  } catch {
    return null;
  }
}

function cacheDays(days: DayContribution[]) {
  try {
    localStorage.setItem(DAYS_CACHE_KEY, JSON.stringify(days));
  } catch {
    /* Storage blocked or full — the loader falls back to an empty grid. */
  }
}

/** The shared fetch, so the loader and the boards make one request between
    them rather than one each. */
export function getActivity(): Promise<Activity> {
  if (!activityPromise) {
    activityPromise = loadActivity().catch((err) => {
      // Cleared so a later caller can try again rather than inheriting this
      // failure for the rest of the visit.
      activityPromise = null;
      throw err;
    });
  }
  return activityPromise;
}

async function loadActivity(): Promise<Activity> {
  /* Two sources, two budgets, so they run together rather than one after the
     other: the day grid comes from the events feed (sixty requests an hour)
     and the monthly totals from the commit search (ten a minute). */
  const [events, monthlyCounts] = await Promise.all([loadEvents(), loadMonthlyCommits()]);

  const dayCounts = new Map<string, number>();
  events.forEach((ev) => {
    if (!CONTRIBUTION_EVENT_TYPES.has(ev.type)) return;
    const day = new Date(ev.created_at).toISOString().slice(0, 10);
    dayCounts.set(day, (dayCounts.get(day) || 0) + eventSize(ev));
  });

  const busiest = monthlyCounts.reduce((max, m) => Math.max(max, m.count ?? 0), 0);
  const months: MonthContribution[] = monthlyCounts.map(({ key, count }) => ({
    key,
    label: monthLabel(new Date(key + "-01T00:00:00Z"), { month: "short" }),
    count,
    level: count === undefined ? 0 : levelForCount(count, busiest),
  }));

  /* The same window by day, for the loader's grid. Always the full
     LOADER_DAYS: the loader is a piece of motion rather than a chart, and a
     grid that changed size with the API's memory would be the wrong thing to
     look at while a page loads. */
  const days: DayContribution[] = [];
  for (let i = LOADER_DAYS - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = dayCounts.get(key) || 0;
    days.push({ date: key, count, level: levelForDay(count) });
  }

  cacheDays(days);

  return {
    months,
    days,
    totalCommits: monthlyCounts.reduce((sum, m) => sum + (m.count ?? 0), 0),
  };
}

/** Every page of the public events feed there is. */
async function loadEvents(): Promise<any[]> {
  const events: any[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=${PER_PAGE}&page=${page}`
    );
    if (!response.ok) throw new Error("Failed to fetch events");
    const batch = await response.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    events.push(...batch);
    // A short page is the last page; asking for the next one only spends a
    // request against the rate limit to be told the same thing.
    if (batch.length < PER_PAGE) break;
  }

  return events;
}

/**
 * The activity, for anything that wants to show a figure from it.
 *
 * Every caller awaits the one cached promise, so the footer's total and the
 * board's grid cost a single set of requests between them however many
 * components ask.
 */
export function useGitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    let alive = true;

    getActivity()
      .then((result) => {
        if (alive) setActivity(result);
      })
      .catch((err) => {
        console.error("Error fetching GitHub activity:", err);
        if (alive) setFailed(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { activity, loading, failed };
}

const GitHubCommitBoard: React.FC<GitHubCommitBoardProps> = ({ compact = false }) => {
  const { activity, loading, failed } = useGitHubActivity();

  /* A square a day, as before. The monthly figures are still fetched — the
     footer's total is built from them — but the grid itself is back to the
     day-by-day view. */
  const days = activity?.days ?? [];
  const visibleDays = compact ? days.slice(-COMPACT_GRID_DAYS) : days;

  const renderGrid = () => (
    <div className="contribution-grid">
      {visibleDays.map((day) => (
        <div className="grid-square-wrap" key={day.date}>
          <div className={`grid-square level-${failed ? 0 : day.level}`} />
          <div className="grid-tooltip">
            {failed ? "Unavailable" : `${day.count} contribution${day.count === 1 ? "" : "s"}`}
            <span className="grid-tooltip-date">
              {new Date(day.date + "T00:00:00Z").toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className="github-commit-board github-commit-board--compact">
        {renderGrid()}
      </div>
    );
  }

  return (
    <div className="github-commit-board">
      <div className="board-header">
        <div className="board-title-group">
          <GithubLogo size={22} weight="bold" />
          <div className="board-titles">
            <h4>GitHub Activity</h4>
            {/* "Commits", not "contributions": this counts commits authored in
                public repositories, which is what the search actually answers.
                GitHub's own contribution total also folds in issues, pull
                requests and reviews, and would be a larger, different number. */}
            <span className="handle">
              {loading
                ? "…"
                : failed
                  ? "Unavailable"
                  : `${activity?.totalCommits ?? 0} commits in ${MAX_MONTHS} months`}
            </span>
          </div>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
          title="View GitHub Profile"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="monthly-stat-banner">
        <div className="stat-content">
          <GitCommit size={18} weight="bold" className="stat-icon" />
          <span className="stat-number">
            {loading ? "..." : failed ? "—" : activity?.recentCommits}
          </span>
          {/* "the last month" beside a row of named months read as one of
              them; this says which 30 days it means. */}
          <span className="stat-text">commits in the last 30 days</span>
        </div>
      </div>

      <div className="contribution-grid-wrapper">
        <div className="grid-header-label">Last {LOADER_DAYS} days</div>
        {renderGrid()}
      </div>
    </div>
  );
};

export default GitHubCommitBoard;
