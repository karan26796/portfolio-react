import React from "react";
import { Clock } from "@phosphor-icons/react";
import "../../styles/skeletons/AwardProgramSkeletons.scss";

interface AwardProgramCTAProps {
  label: string;
  /**
   * 'primary' - the one actionable next step (e.g. "Open nominations")
   * 'disabled' - next step exists but isn't available yet (e.g. "Launch" before a panel is staffed)
   * 'countdown' - passive text with no action, just a wait (e.g. "2 days left to nominate")
   */
  variant?: "primary" | "disabled" | "countdown";
}

/** Skeleton of the award program's dynamic header CTA — same slot, different label/state per lifecycle step. */
const AwardProgramCTA: React.FC<AwardProgramCTAProps> = ({ label, variant = "primary" }) => {
  if (variant === "countdown") {
    return (
      <div className="skeleton-cta skeleton-cta--countdown">
        <Clock size={14} weight="bold" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`skeleton-cta skeleton-cta--button${variant === "disabled" ? " is-disabled" : ""}`}
      disabled={variant === "disabled"}
    >
      {label}
    </button>
  );
};

export default AwardProgramCTA;
