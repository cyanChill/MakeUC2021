const format = require("date-fns/format");

const formatToDateTime = (date) => {
  return format(new Date(date), "yyyy-MM-dd'T'HH:ss");
};

module.exports = formatToDateTime;
