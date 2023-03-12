export const checkSubString = (string: string, subString: string) => string
  .toLowerCase()
  .includes(subString.toLowerCase());

const formatAvailability = (availability: { from: string, to : string }) => ({
  from: availability.from === '24:00' ? '23:59' : availability.from,
  to: availability.to === '24:00' ? '23:59' : availability.to,
});

export const convertAvailabilityIntoDate = (availability: { from: string, to : string }) => {
  const formattedAvailability = formatAvailability(availability);

  const splittedFrom = formattedAvailability.from.split(':');
  const splittedTo = formattedAvailability.to.split(':');

  const auxiliaryFromDate = new Date();
  const auxiliaryToDate = new Date();

  auxiliaryFromDate.setHours(Number(splittedFrom[0]), Number(splittedFrom[1]), 0);
  auxiliaryToDate.setHours(Number(splittedTo[0]), Number(splittedTo[1]), 0);

  return {
    from: auxiliaryFromDate,
    to: auxiliaryToDate,
  };
};
