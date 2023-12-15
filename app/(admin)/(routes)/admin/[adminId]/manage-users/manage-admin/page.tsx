import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { currentProfile } from "@/lib/hooks/current-profile";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "./_components/column";
import { getAllAdmins } from "@/lib/actions/admin.actions";

const page = async ({
    params
}:{
    params:{adminId:string}
}) => {
    const user = await currentProfile();
    
    if(!user) redirect("/")

    const data = await getAllAdmins();
    console.log(data)

  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage Admin" description="All Users excluding teachers and student will be manage here." />
      <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add 
      </Link>
      </div>
      <Separator />
      <DataTable searchKey="firstName" columns={columns} data={data} />
      {/* <div className="md:px-4">
            <Tabs defaultValue="account" className=" w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-4">
                    <TabsTrigger value="account">All</TabsTrigger>
                    <TabsTrigger value="password">Class</TabsTrigger>
                    <TabsTrigger value="password">Class</TabsTrigger>
                    <TabsTrigger value="password">Class</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="w-ful">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div> */}
    </>
  );
};

export default page;
