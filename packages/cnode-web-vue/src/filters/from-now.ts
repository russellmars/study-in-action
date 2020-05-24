import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function(time: string | number | Date | dayjs.Dayjs) {
  const value = dayjs(time);
  return value.fromNow();
}
