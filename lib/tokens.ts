export type TokenSwatch = {
  name: string;
  cssVar: string;
  value: string;
};

export const colorTokens: TokenSwatch[] = [
  { name: "forest-deep", cssVar: "--forest-deep", value: "#15231A" },
  { name: "forest", cssVar: "--forest", value: "#2F4A2A" },
  { name: "gold", cssVar: "--gold", value: "#C39E3A" },
  { name: "gold-deep", cssVar: "--gold-deep", value: "#8A6D1F" },
  { name: "cream", cssVar: "--cream", value: "#FBF8EE" },
  { name: "sage-muted", cssVar: "--sage-muted", value: "#A8B59C" },
  { name: "glass", cssVar: "--glass", value: "rgba(47,74,42,0.35)" },
  { name: "glass-solid", cssVar: "--glass-solid", value: "rgba(21,35,26,0.78)" },
  { name: "glass-border", cssVar: "--glass-border", value: "rgba(195,158,58,0.15)" },
];

export const radiusTokens: TokenSwatch[] = [
  { name: "radius-panel", cssVar: "--radius-panel", value: "20px" },
  { name: "radius-pill", cssVar: "--radius-pill", value: "999px" },
  { name: "radius-card", cssVar: "--radius-card", value: "14px" },
];
