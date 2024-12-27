import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TicketCard from "../_components/ticket-card";
import Link from "next/link";

const CodesPage = async () => {
    const user = await currentUser()
    const userId = user?.id

    if (!userId) {
        return redirect("/");
    }

    const tickets = await db.contactForm.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <>
            <div className="m-2 flex justify-between">
                <h2 className="m-2 flex flex-col">رصيدك الحالي: 500</h2>
                <h2 className="m-2 flex flex-col">اضافة رصيد</h2>
            </div>
            <div className="p-6 flex justify-center">
                <Link href="/home/contact">
                <Button>
                    موضوع جديد
                </Button>
                </Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {/* Render QRCodeCard for each code */}
                {tickets.map((ticket) => {
                    // Construct the QR code value using the code's data
                    const formattedDate = new Date(ticket.createdAt).toLocaleString();
                    const ticketData = {
                        updatedAt: ticket.updatedAt
                    };

                    const qrCodeValue = JSON.stringify(ticketData);

                    return (
                        <TicketCard
                            key={ticket.id}
                            ticketId={ticket.id}
                            // qrCodeValue={qrCodeValue}
                            title={ticket.title} // Display the title
                            date={formattedDate}
                        />

                    );
                })}
            </div>
        </>
    );
}

export default CodesPage;