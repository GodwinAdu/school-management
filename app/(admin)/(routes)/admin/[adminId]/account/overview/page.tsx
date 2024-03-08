import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PlusCircle, Users } from "lucide-react";
import Link from "next/link";


const ShowAccountsDashboard = async () => {



    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Account Overview" description="The overview of account for institution." />
                <Link href={`/`} className={cn(buttonVariants())} >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Link>
            </div>
            <Separator />
            <div className="mx-auto py-2 ">
                <h1 className="font-bold py-2 text-xl  ">Invoices</h1>
                <div className="flex flex-1 gap-4  overflow-x-auto">

                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Unpaid Invoices
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Unpaid Amounts
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Separator />
            <div className="mx-auto py-2 ">
                <h1 className="font-bold py-2 text-xl  ">Today Transactions</h1>
                <div className="flex flex-1 gap-4  overflow-x-auto">
                    <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Incomes</CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Expenses
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Profits
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Separator />
            <div className="mx-auto py-2 ">
                <h1 className="font-bold py-2 text-xl  ">Monthly Transaction</h1>
                <div className="flex flex-1 gap-4  overflow-x-auto">
                    <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Income</CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Expenses
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Profit
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Separator />
            <div className="mx-auto py-2 ">
                <h1 className="font-bold py-2 text-xl  ">Yearly Transaction</h1>
                <div className="flex flex-1 gap-4  overflow-x-auto">
                    <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Income</CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Expenses
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Profits
                            </CardTitle>
                            <Users className="h-5 w-5 font-bold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    );
};

export default ShowAccountsDashboard;
