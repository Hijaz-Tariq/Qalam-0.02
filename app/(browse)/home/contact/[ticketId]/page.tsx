"use client"

import React, { useEffect, useState } from "react";
import { useParams, redirect } from "next/navigation"; // Use useParams here
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
// Define the types for ticket and message
interface Message {
    id: string;
    content: string;
    createdAt: string;
    sender: string;
}

interface Ticket {
    id: string;
    username: string;
    userId: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    messages: Message[];
}

const TicketForm: React.FC = () => {
    const user = useCurrentUser();
    const role = useCurrentRole();
    const userId = user!.id;



    const { ticketId } = useParams(); // Access ticketId from URL params
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        if (!userId) {
            return redirect("/");
        }
        // Ensure ticketId exists before making the API request
        if (ticketId) {
            axios
                .get(`/api/contact/${ticketId}`)
                .then((response) => {
                    const fetchedTicket = response.data;

                    // Check if the logged-in user is the owner of the ticket or an admin
                    if (fetchedTicket.userId !== userId && role !== "ADMIN") {
                        // If the user is not the owner and not an admin, redirect away
                        return redirect("/");  // Redirect to homepage or any other page you prefer
                    }

                    setTicket(fetchedTicket);
                })
                .catch(() => {
                    toast.error("Failed to load the ticket.");
                });
        }
    }, [ticketId, userId, role]);

    const handleReply = async () => {
        if (!newMessage.trim()) {
            toast.error("Please write a message before sending.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`/api/contact/${ticketId}/reply`, {
                message: newMessage,
            });
            toast.success("Message sent successfully!");
            setNewMessage(""); // Clear the message input
            // Reload ticket data to reflect the new message
            const response = await axios.get(`/api/contact/${ticketId}`);
            setTicket(response.data);
        } catch (error) {
            toast.error("Failed to send the message.");
        }
        finally {
            setLoading(false);
        }
    };

    if (!ticket) {
        return <div>Loading ticket...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold">Ticket Details</h1>
            {role == "ADMIN" ? <div className="mt-4">
                <h2 className="text-xl font-medium">Ticket Information</h2>
                <p><strong>User:</strong> {ticket.username}</p>
                <p><strong>Email:</strong> {ticket.email}</p>
                <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                <p><strong>Last Updated:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
            </div>
                : ''}
            <div className="mt-6">
                <p><strong>Title:</strong> {ticket.title}</p>
                <h2 className="text-xl font-medium">Messages</h2>
                {ticket.messages.length > 0 ? (
                    <div>
                        {ticket.messages.map((message) => (
                            <div key={message.id} className="border-b border-gray-300 py-2">
                                <p><strong>By:</strong> {message.sender}</p>
                                <p>{message.content}</p>
                                <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No messages yet.</p>
                )}
            </div>

            <div className="mt-6">
                <textarea
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Write your reply here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                    disabled={loading}
                    onClick={handleReply}
                    className="mt-4">
                    {loading ? "Sending..." : "Send Reply"}
                </Button>
            </div>
        </div>
    );
};

export default TicketForm;
