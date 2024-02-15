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
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {  subjectColumns } from "../_component/subject/column";
import { fetchSubjectForClass } from "@/lib/actions/subject.actions";
import { studentColumns } from "../_component/student/column";
import { teacherColumns } from "../_component/teacher/column";
import { fetchStudentForClass } from "@/lib/actions/student.actions";
import { fetchTeacherForClass } from "@/lib/actions/teacher.actions";

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

  

  const getTitle = (result) =>{
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
         title={`${getTitle(result)} Details`}
          description={`View ${getTitle(result)} with it subjects, students antd it teachers.`}
        />
        <Link
          href={`/admin/${pathId}/system-config/manage-classes`}
          className={cn(buttonVariants())}
        >
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
                <CardTitle>{`${getTitle(result)} `}</CardTitle>
                <CardDescription>
                  {`This class is for ${getTitle(result)} students with ${result?.level}-level  and has the code ${result?.code}. Here are some more details`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="py-5">
                    <p className="flex gap-4">
                      Number of Subjects:{" "}
                      <span className="mr-2 font-bold">
                        {subjects?.length || 0}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <div className="py-5">
                    <p className="flex gap-4">
                      Number of Students:{" "}
                      <span className="mr-2 font-bold">
                        {students?.length || 0}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <div className="py-5">
                    <p className="flex gap-4">
                      Number of Teachers:{" "}
                      <span className="mr-2 font-bold">
                        {teachers?.length || 0}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <div className="flex gap-4 items-center py-5 flex-wrap">
                    <Link href={``} className={cn(buttonVariants())}>
                      Create subject
                    </Link>
                    <Link href={``} className={cn(buttonVariants())}>
                      Create student
                    </Link>
                    <Link href={``} className={cn(buttonVariants())}>
                      Create teacher
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subjects">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable searchKey="subjectName" columns={subjectColumns} data={subjects} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
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
