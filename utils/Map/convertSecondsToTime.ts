export const convertSecondsToTime = (seconds: number) => {
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  let sec = seconds / 60;

  return `${hours} hours ${minutes} min ${sec.toFixed(0)} seconds`;
};
