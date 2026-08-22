import React from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import "../../styles/skeletons/AwardProgramSkeletons.scss";

interface NomineeRowProps {
  name: string;
  role?: string;
  comment?: string;
  /** Shows pencil/trash affordances for the nominator's own entry. */
  editable?: boolean;
}

/** Skeleton of a single nominee row, as seen in the nominee table. */
const NomineeRow: React.FC<NomineeRowProps> = ({ name, role, comment, editable = false }) => (
  <div className="skeleton-nominee-row">
    <div className="skeleton-nominee-row__avatar">{name.charAt(0).toUpperCase()}</div>
    <div className="skeleton-nominee-row__info">
      <p className="name">{name}</p>
      {role && <p className="role">{role}</p>}
    </div>
    {comment && <p className="skeleton-nominee-row__comment">{comment}</p>}
    {editable && (
      <div className="skeleton-nominee-row__actions">
        <PencilSimple size={14} />
        <Trash size={14} />
      </div>
    )}
  </div>
);

export default NomineeRow;
