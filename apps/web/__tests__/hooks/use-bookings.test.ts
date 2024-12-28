import { useAuth } from "@/apps/web/hooks/use-auth";
import { useBookings } from "@/apps/web/hooks/use-bookings";
import { renderHook, waitFor } from "@testing-library/react";

// Mock useAuth hook
jest.mock("@/apps/web/hooks/use-auth", () => ({
  useAuth: jest.fn(),
}));

describe("useBookings", () => {
  it("returns user bookings when authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: "4", role: "GUEST" },
    });

    const { result } = renderHook(() => useBookings());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.bookings).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("returns empty bookings when not authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    const { result } = renderHook(() => useBookings());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.bookings).toHaveLength(0);
  });
});
