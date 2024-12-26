"use client";

import QRCode from "qrcode.react";
import { Card } from "@/components/ui/card";
import React from "react";
import Link from "next/link";

interface TicketCardProps {
    // qrCodeValue: string;
    ticketId: string;
    title: string;
    date: string;
}

const TicketCard = ({ ticketId, title, date }: TicketCardProps) => {
    const qrCodeRef = React.useRef<HTMLDivElement | null>(null); // Create a ref to access the QRCode container

    // Function to download the QR code as an image
    // const downloadQRCode = () => {
    //     if (qrCodeRef.current) {
    //         const canvas = qrCodeRef.current.querySelector("canvas");
    //         if (canvas) {
    //             const imageUrl = canvas.toDataURL("image/png"); // Convert canvas to image URL
    //             const link = document.createElement("a"); // Create a download link
    //             link.href = imageUrl;
    //             link.download = `${title}_QRCode.png`; // Set the filename
    //             link.click(); // Trigger the download
    //         }
    //     }
    // };

    return (
        <Link href={`/home/contact/${ticketId}`}>
            <Card className="p-2 m-2">
                <div className="flex items-center" ref={qrCodeRef}>
                    {/* Render the QR code */}
                    {/* <QRCode value={qrCodeValue} size={128} level="H" renderAs="canvas" /> */}
                    <div className="flex flex-col">
                        <h3 className="m-4 px-3">
                            <span>{title}</span>  : الموضوع
                        </h3>
                        <h3 className="m-4 px-3">
                            تاريخ الانشاء : <span>{date}</span>
                        </h3>
                    </div>
                    {/* <button
                    onClick={downloadQRCode}
                    className=" bg-blue-600 text-white rounded"
                >
                    تحميل
                </button> */}
                </div>
            </Card>
        </Link>
    );
};

export default TicketCard;
