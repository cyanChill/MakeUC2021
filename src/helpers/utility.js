import { format } from "date-fns";

const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "LLLL dd p");
};

export { formatDate };
