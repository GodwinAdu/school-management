import Heading from "@/components/heading/Header";
import { DataTable } from "@/components/tables/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchClassByStage } from "@/lib/actions/class.actions";
import { currentProfile } from "@/lib/hooks/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { columns } from "../_component/subject/column";

const page =async ({
  params,
}: {
  params: { adminId: string; slug: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const stage = params.slug;

  const result = await fetchClassByStage({stage});

  const subjects = []
  const students = []
  const teachers = []

  console.log(result,"class")

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Class ${result.stage} Details`}
          description={`view  class ${result.stage} details with it subjects, students antd it teachers.`}
        />
        <Link href={`manage-admin/create`} className={cn(buttonVariants())}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="md:px-4 pt-3">
        <Tabs defaultValue="details" className=" w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="w-ful">
            <Card>
              <CardHeader>
                <CardTitle>Class {result.stage}</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="py-5">
                    <p>Number of Subjects: <span className="mr-2 font-bold">0</span></p>
                  </div>
                  <Separator />
                  <div className="py-5">
                    <p>Number of Students: <span className="mr-2 font-bold">0</span></p>
                  </div>
                  <Separator />
                  <div className="py-5">
                    <p>Number of Teachers: <span className="mr-2 font-bold">0</span></p>
                  </div>
                  <Separator />
                  <div className="flex gap-4 items-center py-5">
                    <Link href={``} className={cn(buttonVariants())}>Create subject</Link>
                    <Link href={``} className={cn(buttonVariants())}>Create student</Link>
                    <Link href={``} className={cn(buttonVariants())}>Create teacher</Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subjects">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable columns={columns} data={subjects} />
                </div>
              </CardContent>
              
            </Card>
          </TabsContent>
          <TabsContent value="students">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable columns={columns} data={students} />
                </div>
              </CardContent>
              
            </Card>
          </TabsContent>
          <TabsContent value="teachers">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable columns={columns} data={teachers} />
                </div>
              </CardContent>
              
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
