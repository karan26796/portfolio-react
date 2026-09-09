/**
 * How anything standing on a board is dressed — one switch for the whole card
 * language.
 *
 * Four places read it: the experiments board on the home page, the training
 * gallery on /figma-training, the Figma community deck beside the experiments,
 * and the community files on /archive. They have to agree — they are the same
 * kind of object on the same ground, some of them a few hundred pixels apart —
 * so the decision lives here instead of being declared four times and
 * drifting.
 *
 * 'canvas-card' mounts each one the way the photo canvas mounts a photograph:
 * a thick white edge, a generous radius, a layered shadow, a degree or two of
 * tilt, and any name on a pill. From canvasCard.scss, shared with /gallery.
 *
 * 'own' returns each place to the chrome it had before — a selected frame on a
 * design canvas for the two scatter stages, an ordinary bordered card for the
 * two decks. Every one of those is still implemented in full, in the
 * stylesheet next to its canvas-card counterpart, so this is a real switch and
 * not a one-way door.
 */
export type TileDressing = 'canvas-card' | 'own';

export const TILE_DRESSING: TileDressing = 'canvas-card';

export const IS_CANVAS_CARD = TILE_DRESSING === 'canvas-card';

/**
 * The dressing class for a card that is not one of the scatter-stage tiles —
 * the two decks, whose own chrome lives under `is-own-card` in their own
 * stylesheets.
 */
export const cardDressingClass = (): string =>
  IS_CANVAS_CARD ? 'is-canvas-card canvas-card' : 'is-own-card';

/** The class list for a tile under the current dressing. */
export const tileClassName = (): string =>
  IS_CANVAS_CARD
    ? 'experiment-tile is-canvas-card canvas-card'
    : 'experiment-tile is-figma-frame';

/** The class list for a tile's name under the current dressing. */
export const tileLabelClassName = (): string =>
  IS_CANVAS_CARD
    ? 'experiment-tile-label canvas-card-label'
    : 'experiment-tile-label';

/**
 * The tilt each tile hangs at, by index.
 *
 * A fixed cycle rather than a random draw, so the arrangement is the same on
 * every load and can be judged by eye. Never zero — one tile hung straight
 * among tilted ones reads as a mistake rather than as variety.
 */
const TILTS = [-2, 1, -1, 2];

export const tiltFor = (index: number): number => TILTS[index % TILTS.length];
