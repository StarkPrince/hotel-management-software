import { getSession } from "@/apps/web/lib/auth";
import { NextResponse } from "next/server";
// import prisma from "@/apps/web/lib/prisma";

export async function GET() {
  try {
    const auth = await getSession();

    if (!auth?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const session = await prisma.session.findFirst({
    //   where: {
    //     userId: auth.id,
    //     isActive: true,
    //     expiresAt: {
    //       gt: new Date(),
    //     },
    //   },
    //   include: {
    //     booking: true,
    //   },
    // });

    // if (!session) {
    //   return NextResponse.json({ error: "No active session" }, { status: 404 });
    // }

    // return NextResponse.json({ session });
  } catch (error) {
    console.error("Failed to fetch active session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
