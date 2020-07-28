import moment from 'moment';

export const timestampToDate = timestamp => {
  const date = moment(timestamp * 1000).toDate();
  const dateFormatted = moment(date).format('DD MMM YYYY HH:mm');
  return dateFormatted;
};
