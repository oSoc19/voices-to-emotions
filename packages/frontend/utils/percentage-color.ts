export default function getPercentageColor(percentage: number) {
  if (!isNaN(percentage)) {
    percentage = percentage < 1 ? percentage * 100 : percentage;

    if (percentage < 45) {
      // RED
      return '#45a06f';
    } else if (percentage >= 45 && percentage <= 65) {
      // ORANGE
      return '#feb069';
    }
  }

  // GREEN
  return '#f44336';
}
