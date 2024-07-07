function getDaySuffix(day) {
  if (day > 3 && day < 21) return "th"; // 4th to 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function formatDate(dateString) {
  const date = new Date(dateString);

  // Get day, month, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  // Get day suffix
  const daySuffix = getDaySuffix(day);

  return `${day}${daySuffix} ${month}, ${year}`;
}
