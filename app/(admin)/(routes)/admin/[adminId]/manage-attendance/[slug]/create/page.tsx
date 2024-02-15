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
import { currentProfile } from "@/lib/helpers/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchSubjectForClass } from "@/lib/actions/subject.actions";
import { fetchStudentForClass } from "@/lib/actions/student.actions";
import { fetchTeacherForClass } from "@/lib/actions/teacher.actions";
import { IClass } from "@/lib/models/class.models";
import { studentColumns } from "../../student/_component/student/column";
import { teacherColumns } from "../../_component/teacher/column";

const page = async ({
  params,
}: {
  params: { adminId: string; slug: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const stage = params.slug;

  const result = await fetchClassByStage({ stage });

  const subjects = (await fetchSubjectForClass({
      level: result.level,
      stage: result.stage,
    })) || [];

  const students = (await fetchStudentForClass({
      level: result.level,
      stage: result.stage,
    })) || [];

  const teachers = (await fetchTeacherForClass({
      level: result.level,
      stage: result.stage,
    })) || [];

  

  const getTitle = (result:IClass) =>{
    const { level, stage } = result;
    console.log(level,stage)
  
    let title;
  
    if (level === "Primary") {
      title = `Class ${stage} `;
    } else if (level === "Junior") {
      if (typeof stage === "string" && stage.startsWith("jhs-")) {
        const jssNumber = stage.split("-")[1];
        title = `JHS ${jssNumber}`;
      } else {
        title = `Unknown Stage Details`; // Handle other cases if needed
      };
    } else if (level === "Secondary") {
      if (typeof stage === "string" && stage.startsWith("shs-")) {
        const shsNumber = stage.split("-")[1];
        title = `SHS ${shsNumber}`;
      } else {
        title = `Unknown Stage `; // Handle other cases if needed
      };
    } else {
      title = `Unknown ${stage} `; // Handle other cases if needed
    }
  
    return title;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
         title={`${getTitle(result)} Attendance`}
          description={`Mark ${getTitle(result)} Students and Teacher Attendance.`}
        />
        <Link
          href={`/admin/${pathId}/manage-attendance`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="md:px-4 pt-3">
        <Tabs defaultValue="students" className=" w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable searchKey="firstName" columns={studentColumns} data={students} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="teachers">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable searchKey="firstname" columns={teacherColumns} data={teachers} />
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
