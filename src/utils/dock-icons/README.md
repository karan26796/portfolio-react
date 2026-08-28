# Dock icons

Square app-icon artwork for the bottom dock.

Drop a file in here, then in `src/components/Dock.tsx`:

```tsx
import figmaIcon from "../utils/dock-icons/figma.webp";
// ...
{ id: "figma", label: "Figma", href: "https://figma.com", art: figmaIcon },
```

`art` replaces `mark`. Artwork set through `art` fills the tile edge to edge;
a `mark` sits inset on a plain tile instead.

- **Square**, 512×512 or larger. The tile is 56px, so it is downscaled.
- **Do not pre-round the corners** — the tile clips them, and pre-rounded art
  double-rounds and shows the background through the gaps. Ship the full square.
- WebP or PNG. Keep transparency only if the icon is meant to sit on the tile
  colour rather than carry its own background.
