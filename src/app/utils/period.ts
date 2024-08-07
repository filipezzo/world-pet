export function period(hour: string) {
  const number = Number(hour.slice(0, 2));

  if (number <= 12) {
    return "morning";
  } else if (number > 12 && number <= 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}