import dayjs from "dayjs";

export default function(time: any, pattern: string) {
  let value = dayjs(time);
  let tempPattern = "YYYY-MM-DD HH:mm:ss";

  if (!pattern) {
    return value.format(tempPattern);
  }

  switch (pattern) {
    case "date":
      tempPattern = "YYYY-MM-DD";
      break;
    case "time":
      tempPattern = "HH:mm:ss";
      break;
    default:
      tempPattern = pattern;
      break;
  }
  return value.format(tempPattern);
}
