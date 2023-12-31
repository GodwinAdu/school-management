import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAdmins } from "@/lib/actions/admin.actions";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";

const ShowUsersDashboard = async () => {
  const allUser = await getAllAdmins();
 

  return (
    <div className="mx-auto ">
      <h1 className="font-bold py-2 text-xl  ">All Users</h1>
      <div className="flex flex-1 gap-4  overflow-x-auto">
        <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No. of Admins</CardTitle>
            <Users className="h-5 w-5 font-bold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUser?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Teachers
            </CardTitle>
            <Users className="h-5 w-5 font-bold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Students
            </CardTitle>
            <Users className="h-5 w-5 font-bold"  />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Employees
            </CardTitle>
            <Users className="h-5 w-5 font-bold"  />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShowUsersDashboard;
