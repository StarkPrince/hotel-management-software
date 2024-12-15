import { PrismaClient } from "@prisma/client";

export const dashboardService = {
  async getStats(prisma: PrismaClient) {
    const [totalRooms, occupiedRooms, activeBookings, totalRevenue] =
      await Promise.all([
        prisma.room.count(),
        prisma.room.count({
          where: { status: "OCCUPIED" },
        }),
        prisma.booking.count({
          where: {
            status: "CONFIRMED",
          },
        }),
        prisma.booking.aggregate({
          where: {
            status: "CHECKED_OUT",
            checkOut: {
              gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
          },
          _sum: {
            totalAmount: true,
          },
        }),
      ]);

    const occupancyRate = (occupiedRooms / totalRooms) * 100;

    return {
      totalRooms,
      occupiedRooms,
      occupancyRate: Math.round(occupancyRate),
      activeBookings,
      revenue: totalRevenue._sum.totalAmount || 0,
    };
  },

  async getRevenueChart(prisma: PrismaClient) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch bookings checked out in the last 30 days
    const bookings = await prisma.booking.findMany({
      where: {
        status: "CHECKED_OUT",
      },
      select: {
        checkOut: true,
        totalAmount: true,
      },
    });

    const monthlyRevenue = new Map();

    bookings.forEach((booking: any) => {
      const month = new Date(booking.checkOut).toLocaleString("default", {
        month: "long",
      });
      monthlyRevenue.set(
        month,
        (monthlyRevenue.get(month) || 0) + booking.totalAmount
      );
    });

    console.log(monthlyRevenue);

    // Format data into the desired structure
    const chartData = Array.from(monthlyRevenue.entries()).map(
      ([month, amount]) => {
        return {
          name: month,
          value: amount,
        };
      }
    );

    return chartData;
  },
};
