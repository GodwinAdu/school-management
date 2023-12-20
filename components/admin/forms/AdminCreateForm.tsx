"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CogIcon,
  PlusCircle,
  User,
  UserIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createAdmin } from "@/lib/actions/admin.actions";
import { ObjectId } from "mongoose";

interface RolenameProps {
  _id: ObjectId;
  displayName: string;
}

const AdminCreateForm = ({ rolename }: RolenameProps[]) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    userName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: new Date(), // Initialize dob as a Date,
    gender: "",
    phone: "",
    password: "",
    role: "",
    maritalStatus: "",
    country: "",
    state: "",
    city: "",
    permanentAddress: "",
    currentAddress: "",
    kin: "",
    kinPhone: "",
    kinRelationship: "",
    idCard: "",
    occupation: "",
    accountType: "",
    accountName: "",
    accountNumber: "",
  });

  const params = useParams();
  const path = usePathname();
  const router = useRouter();

  const handleInputChange = (name: string, value: any) => {
    console.log(`Updating ${name} with value:`, value);

    if (name === "dob" && value instanceof Date) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //   const onValueChange = (value: string) => {
  //     if (selectChoices) {
  //       const matchingValue = selectChoices.find(
  //         (element) => element.value == value
  //       );
  //       if (matchingValue) {
  //         setCurrentItem({ ...matchingValue });
  //         setAvailableList(
  //           selectChoices.filter((i) => i.value != matchingValue.value)
  //         );
  //         onChange && onChange(value);
  //       }
  //     }
  //   };

  const handleNext = () => {
    // Check if the current step is complete
    const isStepComplete = validateStep(activeStep);

    // If the step is complete, proceed to the next step
    if (isStepComplete) {
      setActiveStep((cur) => cur + 1);
    } else {
      // Handle incomplete step (e.g., show a message, highlight missing fields)
      toast({
        title: "Cannot continue to next session",
        description: "please make sure to complete the neccesary fields",
        variant: "destructive",
      });
    }
  };

  const validateStep = (step: number) => {
    // Implement logic to check if all required fields for the given step are filled
    switch (step) {
      case 0:
        // Check if all fields for step 0 are filled
        return (
          !!formData.firstName &&
          !!formData.lastName &&
          !!formData.email &&
          !!formData.phone &&
          !!formData.gender &&
          !!formData.dob
        );
      case 1:
        // Check if all fields for step 1 are filled
        return (
          !!formData.country &&
          !!formData.state &&
          !!formData.city &&
          !!formData.currentAddress &&
          !!formData.kin &&
          !!formData.kinPhone &&
          !!formData.kinRelationship
        );

      case 2:
        // Check if all fields for step 4 are filled
        return (
          !!formData.role &&
          !!formData.idCard &&
          !!formData.occupation &&
          !!formData.accountType &&
          !!formData.accountName &&
          !!formData.accountNumber
        );

      default:
        return false;
    }
  };

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleCreateAdmin = async () => {
    try {
      setIsLoading(true);
      await createAdmin(formData, path);
      router.push(`/admin/${params.adminId}/manage-users/manage-admin`);
      toast({
        title: "Created sucessfully",
        description: "User was created sucessfully",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: "Unable able to create. please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
        </Step>
        <Step onClick={() => setActiveStep(4)}>
          <Check className="h-5 w-5" />
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4 py-4">
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="name">
                User Name
              </Label>
              <Input
                type="text"
                placeholder="user name"
                value={formData.userName} // Add this line
                onChange={(e) => handleInputChange("userName", e.target.value)}
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="name">
                First Name
              </Label>
              <Input
                type="text"
                placeholder="First Name"
                value={formData.firstName} // Add this line
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="middle name">
                Middle Name
              </Label>
              <Input
                type="text"
                placeholder="Enter Middle Name"
                value={formData.middleName} // Add this line
                onChange={(e) =>
                  handleInputChange("middleName", e.target.value)
                }
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="last name">
                Last Name
              </Label>
              <Input
                type="text"
                placeholder="Enter Last Name"
                value={formData.lastName} // Add this line
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter Email"
                value={formData.email} // Add this line
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="phone">
                Phone
              </Label>
              <Input
                type="phone"
                placeholder="Eter Tel number"
                value={formData.phone} // Add this line
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="phone">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Eter Tel number"
                value={formData.password} // Add this line
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="gender">
                gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(onValueChange) =>
                  handleInputChange("gender", onValueChange)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not defined">Not defined</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="last name">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !formData.dob && "text-muted-foreground"
                    )}
                  >
                    {formData.dob ? (
                      format(formData.dob, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={formData.dob}
                    onSelect={(date) => handleInputChange("dob", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </>
      )}
      {activeStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 py-4">
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="country">
              Country
            </Label>
            <Input
              type="text"
              placeholder="Enter country here"
              value={formData.country} // Add this line
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="state">
              State
            </Label>
            <Input
              type="text"
              placeholder="Enter state here"
              value={formData.state} // Add this line
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="city">
              City
            </Label>
            <Input
              type="text"
              placeholder="Enter City here"
              value={formData.city} // Add this line
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="currentAddress">
              Current Address
            </Label>
            <Input
              type="address"
              placeholder="Enter City here"
              value={formData.currentAddress} // Add this line
              onChange={(e) =>
                handleInputChange("currentAddress", e.target.value)
              }
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="permanentAddress">
              Permanent Address
            </Label>
            <Input
              type="text"
              placeholder="Enter permanent Address(Optional)"
              value={formData.permanentAddress} // Add this line
              onChange={(e) =>
                handleInputChange("permanentAddress", e.target.value)
              }
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
              <Label className="font-bold " htmlFor="marital status">
                Marital Status
              </Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(onValueChange) =>
                  handleInputChange("maritalStatus", onValueChange)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="maritalStatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not defined">Not defined</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
            </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="permanentAddress">
              Next of Kin
            </Label>
            <Input
              type="text"
              placeholder="Enter Next of kin full name"
              value={formData.kin} // Add this line
              onChange={(e) => handleInputChange("kin", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="permanentAddress">
              Next of Kin Phone No.
            </Label>
            <Input
              type="text"
              placeholder="Enter Next of kin phone number"
              value={formData.kinPhone} // Add this line
              onChange={(e) => handleInputChange("kinPhone", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="permanentAddress">
              Relationship to Next of Kin
            </Label>
            <Input
              type="text"
              placeholder="Enter Relationship to Next of kin"
              value={formData.kinRelationship} // Add this line
              onChange={(e) =>
                handleInputChange("kinRelationship", e.target.value)
              }
            />
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 py-4">
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="gender">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(onValueChange) =>
                handleInputChange("role", onValueChange)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {rolename?.map((role) => (
                  <SelectItem key={role._id} value={role.displayName}>
                    {role.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="picture">
              ID card Number
            </Label>
            <Input
              type="text"
              placeholder="Enter ID Number"
              value={formData.idCard} // Add this line
              onChange={(e) => handleInputChange("idCard", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="picture">
              Occupation
            </Label>
            <Input
              type="text"
              placeholder="Enter occupation"
              value={formData.occupation} // Add this line
              onChange={(e) => handleInputChange("occupation", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="Account type">
              Select Account Type
            </Label>
            <Select
              value={formData.accountType}
              onValueChange={(onValueChange) =>
                handleInputChange("accountType", onValueChange)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="mobile Money">Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="picture">
              Account Name
            </Label>
            <Input
              type="text"
              placeholder="Enter Account Name"
              value={formData.accountName} // Add this line
              onChange={(e) => handleInputChange("accountName", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold " htmlFor="picture">
              Account Number
            </Label>
            <Input
              type="text"
              placeholder="Enter Account Number"
              value={formData.accountNumber} // Add this line
              onChange={(e) =>
                handleInputChange("accountNumber", e.target.value)
              }
            />
          </div>
        </div>
      )}
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>

        {isLastStep ? (
          <Button
            onClick={handleCreateAdmin}
            disabled={isLoading}
            disabled={isLoading || !validateStep(2)}
          >
            {isLoading ? "Creating ..." : " Create Admin"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminCreateForm;
