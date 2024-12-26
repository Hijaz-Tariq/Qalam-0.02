import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const user = await currentUser();
    const role = user?.role;
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { ticketId } = params;
    const { message } = await req.json();

    // Create a new message for the ticket
    const newMessage = await db.message.create({
      data: {
        ticketId,
        content: message,
        sender: user.username+`(`+role+`)`, // Set sender to 'admin' or based on the context
      },
    });

    // Update the associated ContactForm with the updated information
    await db.contactForm.update({
      where: { id: ticketId },
      data: { updatedBy: user.username }, // Store the admin's name in updatedBy
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("[ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
