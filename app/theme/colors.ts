// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  white: "#FFFFFF",
  black: "#000000",

  neutral50: "#f9fafb",
  neutral100: "#C2D9CD",
  "neutral100_12%": "#C2D9CD1F",
  "neutral100_50%": "#CCF5E166",
  neutral150: "#e5e7eb",
  neutral200: "#A0B2A9",
  neutral300: "#67736D",
  "neutral300_10%": "#67736D1A",
  "neutral300_30%": "#67736D4D",
  neutral400: "#B6ACA6",
  neutral500: "#000D06",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral850: "#000704",
  neutral900: "#000000",

  primary100: "#CCF5E1",
  primary200: "#AAEFCC",
  primary300: "#52DE98",
  primary400: "#00CF67",
  primary500: "#00AE57",
  primary600: "#007C3E",
  primary700: "#001A0D",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.primary700,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
