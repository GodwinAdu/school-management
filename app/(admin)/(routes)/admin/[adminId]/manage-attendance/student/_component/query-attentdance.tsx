"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react";
import { studentColumns1 } from "./student/column1";
import { IStudent } from "@/lib/models/student.models";
import { TableData } from "@/components/tables/table-data";
import { DataTable } from "@/components/tables/data-table";
import { trpc } from "@/app/_trpc/client";
import { getStudentAttendances } from "@/lib/helpers/attendance";


const FormSchema = z.object({
    searchDate: z.date({
        required_error: "A date of birth is required.",
    }),
})

const GetAttendance = ({classId}:{classId:string}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [present, setPresent] = useState<IStudent[]>([])
    const [absent, setAbsent] = useState<IStudent[]>([])
    const [ loading, setLoading ] =  useState(false)

    const { data: value, isLoading } = trpc.getStudentAttendance.useQuery(
        {classId},
        {
          refetchInterval: (value) => (value ? false : 500),
        }
      );
      console.log(value?.presentStudents,"values");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
           setLoading(true)
           const attendanceData = await getStudentAttendances({
            classId,
            searchDate:data.searchDate
           })
           setPresent(attendanceData?.presentStudents)
           setAbsent(attendanceData?.absentStudents)
           setLoading(false)

        } catch (error:any) {
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
                <Card>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Tabs defaultValue="present" className=" w-full ">
                                <TabsList className="grid w-full max-w-lg grid-cols-4 ">
                                    <TabsTrigger value="present">Presents</TabsTrigger>
                                    <TabsTrigger value="absent">Absents</TabsTrigger>
                                </TabsList>
                                <TabsContent value="present">
                                    <Card>
                                        <CardContent className="space-y-1">
                                            <div className="space-y-1">
                                                <DataTable searchKey="firstName" columns={studentColumns1} data={present ? present : value?.presentStudents} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="absent">
                                    <Card>
                                        <CardContent className="space-y-1">
                                            <div className="space-y-1">
                                                <DataTable searchKey="firstName" columns={studentColumns1} data={absent ? absent : value?.absentStudents} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default GetAttendance
