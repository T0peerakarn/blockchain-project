type DateInputType = Date | undefined | null;

export function formatDate(date: DateInputType) {
  const dateTimeformat = new Intl.DateTimeFormat("en-GB", {
    hour12: false,
    timeStyle: "short",
    dateStyle: "medium",
  });
  return date ? dateTimeformat.format(date) : "";
}

export function formatDateRange(start: DateInputType, end: DateInputType) {
  const formattedStart = formatDate(start).split(", ");
  const formattedEnd = formatDate(end).split(", ");

  return formattedStart[0] === formattedEnd[0]
    ? `${formattedStart[1]} - ${formattedEnd[1]}, ${formattedStart[0]}`
    : `${formattedStart[1]}, ${formattedStart[0]} - ${formattedEnd[1]}, ${formattedEnd[0]}`;
}
