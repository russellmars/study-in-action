import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function(time: any) {
  let value = dayjs(time);
  return value.fromNow();
}
