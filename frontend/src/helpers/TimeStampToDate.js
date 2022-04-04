const timeStampToDate = (timeStamp) => {
  let milliseconds = timeStamp * 1000;
  let date = new Date(milliseconds);
  return date.toDateString() + ' ' + date.getHours() + ':'
      + date.getMinutes();
};

export default timeStampToDate;
