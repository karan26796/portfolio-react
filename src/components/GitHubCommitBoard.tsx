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

const FULL_GRID_DAYS = 35;
const COMPACT_GRID_DAYS = 16;

interface DayContribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubCommitBoardProps {
  /** Renders just the contribution squares, without the header or stat banner. */
  compact?: boolean;
}

function levelForCount(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function eventSize(ev: any): number {
  if (ev.type !== "PushEvent") return 1;
  return ev.payload?.distinct_size ?? ev.payload?.commits?.length ?? ev.payload?.size ?? 1;
}

const GitHubCommitBoard: React.FC<GitHubCommitBoardProps> = ({ compact = false }) => {
  const [days, setDays] = useState<DayContribution[]>([]);
  const [monthlyCommits, setMonthlyCommits] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const events = await response.json();

        const counts = new Map<string, number>();
        const today = new Date();
        for (let i = 0; i < FULL_GRID_DAYS; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          counts.set(d.toISOString().slice(0, 10), 0);
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        let monthly = 0;

        if (Array.isArray(events)) {
          events.forEach((ev: any) => {
            if (!CONTRIBUTION_EVENT_TYPES.has(ev.type)) return;
            const created = new Date(ev.created_at);
            const key = created.toISOString().slice(0, 10);
            const size = eventSize(ev);

            if (counts.has(key)) counts.set(key, (counts.get(key) || 0) + size);
            if (ev.type === "PushEvent" && created >= thirtyDaysAgo) monthly += size;
          });
        }

        const list = Array.from(counts.entries())
          .map(([date, count]) => ({ date, count, level: levelForCount(count) }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setDays(list);
        setMonthlyCommits(monthly);
      } catch (err) {
        console.error("Error fetching GitHub activity:", err);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const visibleDays = compact ? days.slice(-COMPACT_GRID_DAYS) : days;

  const renderGrid = () => (
    <div className="contribution-grid">
      {visibleDays.map((day) => (
        <div className="grid-square-wrap" key={day.date}>
          <div className={`grid-square level-${failed ? 0 : day.level}`} />
          <div className="grid-tooltip">
            {failed ? "Unavailable" : `${day.count} contribution${day.count === 1 ? "" : "s"}`}
            <span className="grid-tooltip-date">
              {new Date(day.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
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
            <span className="handle">@{USERNAME}</span>
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
            {loading ? "..." : failed ? "—" : monthlyCommits}
          </span>
          <span className="stat-text">commits in the last month</span>
        </div>
      </div>

      <div className="contribution-grid-wrapper">
        <div className="grid-header-label">Last {FULL_GRID_DAYS} days</div>
        {renderGrid()}
      </div>
    </div>
  );
};

export default GitHubCommitBoard;
