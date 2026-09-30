export type DemoProps = {
  /** Values from the detail page controls (or registry defaults). */
  values: Record<string, string | number>;
  /** Smaller rendering for grid cards. */
  compact?: boolean;
};
