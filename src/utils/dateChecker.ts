export const checkIfDateIsOlderThan = (time: string, timeInMs: number) => {
  const now = new Date();
  const pastTime = new Date(time);
  const timeDiffInMs = now.getTime() - pastTime.getTime();

  return timeDiffInMs >= timeInMs;
};
