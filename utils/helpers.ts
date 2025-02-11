export function predictCourseDuration(totalHours: number, hoursPerWeek = 3) {
  const noOfWeeks = Math.round(totalHours / hoursPerWeek);

  const noOfMonths = Math.round(noOfWeeks / 4);

  return noOfMonths;
}

export function predictUnitDuration(totalHours: number, hoursPerDay = 1) {
  const noOfDays = Math.round(totalHours / hoursPerDay);

  const noOfWeeks = Math.round(noOfDays / 4);

  return noOfWeeks;
}
