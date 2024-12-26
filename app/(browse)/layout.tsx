import { Banner } from "@/components/banner";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import Link from "next/link";


const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Container>
                    {/* <Banner
                        label="تنويه: الموقع ما زال قيد التطوير , نرجوا محادثتنا في حال واجهتك اي مشكلة"
                    /> */}
                    <span dir="rtl" className="border text-center p-2 text-sm flex items-center w-full bg-yellow-200/80 border-yellow-30 text-primary">
                        في حال واجهتك اي مشكلة
                        <Link href="/home/contact" className="text-blue-600 font-extrabold">
                            التواصل معنا
                        </Link>
                        تنويه: الموقع ما زال قيد التطوير , نرجوا

                    </span>
                    {children}
                </Container>
            </div>
        </>
    );
}

export default BrowseLayout;