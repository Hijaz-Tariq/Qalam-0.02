import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { currentRole } from "@/lib/auth";

const CoursesPage = async () => {
    const role = await currentRole()


    if (role !== "ADMIN") {
        return redirect("/");
    }

    const messages = await db.contactForm.findMany({
        include: {
            messages: {
                take: 1,
                select: {
                    ticketId: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const modifiedMessages = messages.map((contactForm) => {
        const ticketId = contactForm.messages[0]?.ticketId;  // Extracting the ticketId
        return {
            ...contactForm,
            ticketId,  // Add ticketId to the contactForm object
        };
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={modifiedMessages} />
        </div>
    );
}

export default CoursesPage;