import mockDb from "@/apps/web/data/mock-db.json";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { useBookings } from "@/apps/web/hooks/use-bookings";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/apps/web/hooks/use-auth");

describe("useBookings", () =>
{
  beforeEach(() =>
  {
    jest.clearAllMocks();
  });

  it("initializes with loading state", () =>
  {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: "1", role: "GUEST" }
    });

    const { result } = renderHook(() => useBookings());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.bookings).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("loads user bookings successfully", async () =>
  {
    const userId = "4";
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: userId, role: "GUEST" }
    });

    const { result } = renderHook(() => useBookings());

    // Wait for the effect to complete
    await act(async () =>
    {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const expectedBookings = mockDb.bookings.filter(b => b.userId === userId);
    expect(result.current.bookings).toEqual(expectedBookings);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles unauthenticated state", async () =>
  {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useBookings());

    await act(async () =>
    {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.bookings).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("handles error state", async () =>
  {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: "invalid-id", role: "GUEST" }
    });

    // Mock an error in the filter operation
    const originalBookings = [...mockDb.bookings];
    mockDb.bookings = null as any;

    const { result } = renderHook(() => useBookings());

    await act(async () =>
    {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe("Failed to fetch bookings");
    expect(result.current.isLoading).toBe(false);

    // Restore the original bookings
    mockDb.bookings = originalBookings;
  });
});