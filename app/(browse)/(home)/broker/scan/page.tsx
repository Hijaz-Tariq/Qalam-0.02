

import { getBalance } from "@/actions/balance";
import Scanner from "./_components/scanner";
import { currentUser } from "@/lib/auth";
import Link from "next/link";



async function App() {
    const user = await currentUser();
    const userId = user?.id

    if (userId === null) {

        console.error("User is not authenticated");
        return null; // or some appropriate fallback
    }

    const userBalance = await getBalance(userId!);

    return (

        <div className="app" dir="rtl">

            <span>يمكن اضافة رصيد الى حسابك عبر احدى الطرق التالية : </span>
            <ul>
                <li> 1- التحويل بوساطة اي محفظة تعمل في فلسطين ( بال باي , اي براق او ريفليكت)
                    <br />
                    <span> IBAN: PS12 ARAB 0000 0000 9230 2635 8257 0 </span>
                    <br />
                    <span> ثم قم بادخال رقم الحوالة (Ref) <Link href="/home/contact/" className="font-extrabold"> هنا</Link></span>
                </li>
                <li>
                    2- عن طريق بطاقات البنوك و الدفع الالكتروني , <Link href="#" className="font-extrabold">من هنا</Link>
                </li>
                <li>
                    3- عن طريق الرمز الخاص بالمنصة (QR-Code) و الذي يمكن الحصول عليه من احد الوكلاء و تحميله او مسحه من الكاميرا مباشرة من الخيارات في الصندوق التالي
                </li>
            </ul>
            <Scanner balance={userBalance} />
        </div>
    );

}

export default App;









