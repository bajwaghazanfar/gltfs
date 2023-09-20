export const convertMetersToMiles = (distance: number) => {
  const miles = distance * 0.000621371192;
  return miles.toFixed(0);
};
