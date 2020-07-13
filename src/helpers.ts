export const timestampToDate = (timestamp) => {
  let a = new Date(timestamp);
  let year = a.getFullYear();
  let month = a.getMonth();
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let time = `${formattedNumber(date)}-${formattedNumber(
    month
  )}-${year} ${formattedNumber(hour)}:${formattedNumber(min)}`;
  return time;
};

export const formattedNumber = (myNumber) => {
  return ('0' + myNumber).slice(-2);
};
