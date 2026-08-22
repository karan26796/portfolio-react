import React from "react";
import { Trophy, PencilSimple, Trash } from "@phosphor-icons/react";
import "../../styles/skeletons/AwardProgramSkeletons.scss";

interface AwardCardProps {
  title: string;
  description?: string;
  tags?: string[];
  /** Shows pencil/trash affordances — the draft/configurable state of an award. */
  editable?: boolean;
  icon?: React.ReactNode;
}

/** Skeleton of a single award card, as seen in the award-program grid. */
const AwardCard: React.FC<AwardCardProps> = ({ title, description, tags = [], editable = false, icon }) => (
  <div className="skeleton-award-card">
    <div className="skeleton-award-card__top">
      <div className="skeleton-award-card__icon">{icon || <Trophy size={18} weight="fill" />}</div>
      {editable && (
        <div className="skeleton-award-card__actions">
          <PencilSimple size={14} />
          <Trash size={14} />
        </div>
      )}
    </div>
    <h5>{title}</h5>
    {description && <p className="skeleton-award-card__desc">{description}</p>}
    {tags.length > 0 && (
      <div className="skeleton-award-card__tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    )}
  </div>
);

export default AwardCard;
