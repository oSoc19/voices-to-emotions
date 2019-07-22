export const msToYears = (ms: number): number => {
  return Math.round(ms / 1000 / 60 / 60 / 24 / 365);
};
