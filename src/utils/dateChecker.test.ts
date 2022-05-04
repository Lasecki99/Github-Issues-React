import { checkIfDateIsOlderThan } from "./dateChecker";

describe("checkIfDateIsOlderThan", () => {
  test("should return false if provided date is date is not older than thirty days", () => {
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    expect(checkIfDateIsOlderThan(new Date().toString(), thirtyDaysInMs)).toBe(
      false
    );
  });

  test("should return true if provided date is date is not older than thirty days", () => {
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    expect(
      checkIfDateIsOlderThan(new Date("2000-01-01").toString(), thirtyDaysInMs)
    ).toBe(true);
  });
});
