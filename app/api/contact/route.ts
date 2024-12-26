// import { currentUser } from "@/lib/auth";
// import { NextResponse } from "next/server";

// import { db } from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     const userId = user?.id;
//     const role = user?.role;
//     const { messages } = await req.json();
//     const username = user?.username;
//     const userEmail = user?.email;
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.contactForm.create({
//       data: {
//         userId,
//         username: username!,
//         email: userEmail!,
//         messages,
//       },
//     });

//     return NextResponse.json(course);
//   } catch (error) {
//     console.log("[COURSES]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Get current user info
    const user = await currentUser();
    const userId = user?.id;
    const role = user?.role; // This is not used in this example, but you could add role-based logic later.
    const { message, title } = await req.json(); // Expecting the message from the user in the request body
    const username = user?.username;
    const userEmail = user?.email;

    // Ensure the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create a new contact form (ticket) in the database
    const contactForm = await db.contactForm.create({
      data: {
        userId,
        username: username!,
        email: userEmail!,
        title: title,
      },
    });

    // Create the first message for the contact form (this is the user's initial message)
    const messageRecord = await db.message.create({
      data: {
        ticketId: contactForm.id, // Link the message to the new contact form (ticket)
        sender: username!, // Indicate that this message is from the user
        content: message, // The content is the message the user submitted
      },
    });

    // Return the newly created contact form with the first message created
    return NextResponse.json({
      ticketId: contactForm.id, // Return the contact ID for reference
      messageId: messageRecord.id, // Optionally return the message ID
    });
  } catch (error) {
    console.log("[CONTACT_FORM_API_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
