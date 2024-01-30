"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Calendar } from "../ui/calendar"
import { useState } from "react"

export function CalenderDashboard() {
    const [date, setDate] =useState<Date | undefined>(new Date())
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent className="w-full">
                <Calendar
                    
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                />
            </CardContent>
            {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
        </Card>
    )
}
