"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from 'sonner';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Define the schema for the contact form
const formSchema = z.object({
    title: z.string().min(6, {
        message: "يجب أن تكون الرسالة على الأقل 6 أحرف",
    }),
    message: z.string().min(10, {
        message: "يجب أن تكون الرسالة على الأقل 10 أحرف",
    }),
});

const ContactForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title:"",
            message: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/contact", values);
            router.push(`/home/contact/${response.data.ticketId}`);
            toast.success("تم إرسال رسالتك بنجاح!");
            form.reset(); // Reset the form after successful submission
        } catch {
            toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
        }
    };

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6" dir="rtl">
            <div>
                <h1 className="text-2xl">نموذج الاتصال</h1>
                <p className="text-sm text-slate-600">
                    يرجى ملء التفاصيل أدناه للتواصل معنا.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="p-2">  العنوان </FormLabel>
                                    <FormControl>
                                        <input
                                            disabled={isSubmitting}
                                            placeholder="  اكتب رسالتك هنا...  "
                                            {...field}
                                            className="bg-background p-1"
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        يرجى كتابة تفاصيل استفسارك أو مشكلتك هنا.
                                        *اذا اردت التواصل عبر الهاتف يجب كتابته في الرسالة
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الرسالة</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="اكتب رسالتك هنا..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        يرجى كتابة تفاصيل استفسارك أو مشكلتك هنا.
                                        *اذا اردت التواصل عبر الهاتف يجب كتابته في الرسالة
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    الغاء
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                إرسال
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ContactForm;
