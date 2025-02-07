export function predictCourseDuration(totalHours: number, hoursPerWeek = 3) {
  const noOfWeeks = Math.round(totalHours / hoursPerWeek);

  const noOfMonths = Math.round(noOfWeeks / 4);

  return noOfMonths;
}
