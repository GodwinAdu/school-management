
import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAdmin } from "@/lib/actions/fetchadmin.actions";
import { fetchStudent } from "@/lib/actions/student.actions";
import { currentProfile } from "@/lib/helpers/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { adminId: string,slug:string, manageStudentId:string } }) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const stage = params.slug;
  const studentDetailId = params.manageStudentId

  const student = await fetchStudent({id: studentDetailId});
 

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Student Details"
          description={`${student?.firstName} ${student?.lastName} ${student?.middleName && student?.middleName } particulars`}
        />
        <Link
          href={`/admin/${pathId}/manage-users/manage-student/${stage}`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="bg-white shadow rounded-lg ">
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 ">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    alt="User Profile"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  />
                  <h1 className="text-xl font-bold">{student?.userName}</h1>
                  <p className="text-gray-700 pt-2">{`${student?.firstName} ${student?.lastName} `}</p>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex gap-3 items-center">
                    <h1 className="text-xl font-bold">Role:</h1>
                    <p className="text-gray-700">Student</p>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg py-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1 className="font-bold pb-2">Email</h1>
                    <p className="italic">{student?.email}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Date of Birth</h1>
                    <p className="italic">date</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Gender</h1>
                    <p className="italic">{student?.gender}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Phone number</h1>
                    <p className="italic">{student?.phone}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Country</h1>
                    <p className="italic">{student?.country}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">State</h1>
                    <p className="italic">{student?.state}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">City</h1>
                    <p className="italic">{student?.city}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Current Address</h1>
                    <p className="italic">{student?.currentAddress}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Permanent Address</h1>
                    <p className="italic">{student?.permanentAddress}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Level</h1>
                    <p className="italic">{student?.level}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-md p-3">
                    <h1  className="font-bold pb-2">Stage</h1>
                    <p className="italic">{student?.stage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
