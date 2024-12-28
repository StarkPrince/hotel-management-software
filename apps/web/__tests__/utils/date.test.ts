import { formatDate, isValidDate } from "@/apps/web/lib/utils/date";

describe("Date Utils", () => {
  describe("formatDate", () => {
    it("formats date string correctly", () => {
      const date = "2024-03-20T14:00:00Z";
      expect(formatDate(date)).toMatch(/3\/20\/2024/);
    });

    it("formats Date object correctly", () => {
      const date = new Date("2024-03-20T14:00:00Z");
      expect(formatDate(date)).toMatch(/3\/20\/2024/);
    });

    it("handles invalid dates", () => {
      const date = "invalid-date";
      expect(formatDate(date)).toBe("Invalid Date");
    });
  });

  describe("isValidDate", () => {
    it("returns true for valid date string", () => {
      expect(isValidDate("2024-03-20T14:00:00Z")).toBe(true);
    });

    it("returns true for valid Date object", () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    it("returns false for invalid date string", () => {
      expect(isValidDate("invalid-date")).toBe(false);
    });

    it("returns false for invalid Date object", () => {
      expect(isValidDate(new Date("invalid"))).toBe(false);
    });
  });
});
