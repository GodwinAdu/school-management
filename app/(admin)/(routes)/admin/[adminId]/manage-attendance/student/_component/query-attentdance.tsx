"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react";
import { studentColumns1 } from "./student/column1";
import { IStudent } from "@/lib/models/student.models";
import { DataTable } from "@/components/tables/data-table";
import { getStudentAttendances } from "@/lib/helpers/attendance";


const FormSchema = z.object({
    searchDate: z.date({
        required_error: "A date of birth is required.",
    }),
})

const GetAttendance = ({ classId }: { classId: string }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [present, setPresent] = useState<IStudent[]>([])
    const [absent, setAbsent] = useState<IStudent[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const queryDate = new Date(currentDate); // Create a new Date object from currentDate
            queryDate.setUTCHours(0,0,0,0); // Set the time components to midnight
            console.log(queryDate.toISOString(), "query"); // Log the ISO string representation
            try {

                const data = await getStudentAttendances({
                    classId,
                    searchDate:queryDate.toISOString(),
                });

                setPresent(data?.presentStudents);
                setAbsent(data?.absentStudents);

            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
                toast({
                    title: "Something went wrong",
                    description: "Please reload to fetch default attendance",
                    variant: "destructive"
                });
            }
        };

        fetchData();

        // No cleanup needed in this case, so no return statement

    }, [classId, currentDate]);

    console.log(absent,"absent")
    console.log(present,"present")
 


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setLoading(true)
            console.log(data.searchDate)
            const attendanceData = await getStudentAttendances({
                classId,
                searchDate: data.searchDate.toISOString(),
            })
            setPresent(attendanceData?.presentStudents)
            setAbsent(attendanceData?.absentStudents)
            setLoading(false)

        } catch (error: any) {
            setLoading(false)
            toast({
                title: "Something went wrong",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">
                    <FormField
                        control={form.control}
                        name="searchDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    format(currentDate, "PPP")
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(value) => {
                                                field.onChange(value);
                                                if (value) {
                                                    // Trigger form submission when the checkbox is checked
                                                    form.handleSubmit(onSubmit)();
                                                }
                                            }}

                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className="space-y-1">

                <Tabs defaultValue="present" className=" w-full ">
                    <TabsList className="grid w-full max-w-lg grid-cols-4 ">
                        <TabsTrigger value="present">Presents</TabsTrigger>
                        <TabsTrigger value="absent">Absents</TabsTrigger>
                    </TabsList>
                    <TabsContent value="present">

                        <div className="space-y-1">
                            <DataTable searchKey="firstName" columns={studentColumns1} data={present} />
                        </div>

                    </TabsContent>
                    <TabsContent value="absent">

                        <div className="space-y-1">
                            <DataTable searchKey="firstName" columns={studentColumns1} data={absent} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default GetAttendance
