import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { ticketId } = params;

    // Fetch the contact form (ticket) along with messages
    const ticket = await db.contactForm.findUnique({
      where: { id: ticketId },
      include: { messages: true }, // Include related messages
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("[ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
