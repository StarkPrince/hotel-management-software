import axios from "axios";
import { BookingSource } from "../enum";

const PLATFORM_APIS: any = {
  [BookingSource.BOOKING_COM]: {
    baseUrl: process.env["BOOKING_COM_API_URL"],
    apiKey: process.env["BOOKING_COM_API_KEY"],
  },
  [BookingSource.MAKEMYTRIP]: {
    baseUrl: process.env["MAKEMYTRIP_API_URL"],
    apiKey: process.env["MAKEMYTRIP_API_KEY"],
  },
  [BookingSource.EXPEDIA]: {
    baseUrl: process.env["EXPEDIA_API_URL"],
    apiKey: process.env["EXPEDIA_API_KEY"],
  },
};

export const bookingPlatformIntegration = {
  async getExternalBookings(platform: BookingSource) {
    const platformConfig = PLATFORM_APIS[platform];
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    try {
      const response = await axios.get(`${platformConfig.baseUrl}/bookings`, {
        headers: {
          Authorization: `Bearer ${platformConfig.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching bookings from ${platform}:`, error);
      throw error;
    }
  },

  async syncAllPlatforms() {
    try {
      const results = await Promise.allSettled(
        Object.keys(PLATFORM_APIS).map((platform) =>
          this.getExternalBookings(platform as BookingSource)
        )
      );
      return results.map((result, index) => ({
        platform: Object.keys(PLATFORM_APIS)[index],
        success: result.status === "fulfilled",
        data: result.status === "fulfilled" ? result.value : null,
        error: result.status === "rejected" ? result.reason : null,
      }));
    } catch (error) {
      return [];
    }
  },
};
