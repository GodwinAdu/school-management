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
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn, isValidEmail, isValidPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/actions/teacher.actions";
import { ILevel } from "@/lib/models/level.models";
import { IStage } from "@/lib/models/stage.models";
import { ITeacher } from "@/lib/models/teacher.models";

type EditTeacherFormProps = {
  initialData:ITeacher
  levels:ILevel[],
  stages:IStage[]
}

const EditTeacherForm = ({initialData,levels,stages }:EditTeacherFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [date, setDate] = useState<Date | null>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const [formData, setFormData] = useState(initialData ?? {
    firstName: "",
    userName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    password: "",
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
    level: "",
    stage: "",
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Set initial values based on the provided initialData
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const params = useParams();
  const path = usePathname();
  const router = useRouter();

  const teacherId:string = params.manageTeacherId as string;
 
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
      // Additional check for email and phone validation
      if (isValidEmail(formData.email) && isValidPhoneNumber(formData.phone)) {
        setActiveStep((cur) => cur + 1);
      } else {
        // Handle invalid email or phone
        toast({
          title: "Invalid Email or Phone",
          description: "Please enter a valid email and phone number.",
          variant: "destructive",
        });
      }
    } else {
      // Handle incomplete step (e.g., show a message, highlight missing fields)
      toast({
        title: "Cannot continue to next session",
        description: "Please make sure to complete the necessary fields",
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
          isValidEmail(formData.email) &&
          isValidPhoneNumber(formData.phone) &&
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
          isValidPhoneNumber(formData.kinPhone) &&
          !!formData.kinRelationship
        );

      case 2:
        // Check if all fields for step 2 are filled
        return (
          !!formData.idCard &&
          !!formData.occupation &&
          !!formData.accountType &&
          !!formData.accountName &&
          !!formData.accountNumber &&
          !!formData.stage &&
          !!formData.level
        );

      default:
        return false;
    }
  };

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleCreateTeacher = async () => {
    try {
      setIsLoading(true);
      console.log(formData)
      await updateTeacher(teacherId,formData, path);
      router.push(`/admin/${params.adminId}/manage-users/manage-teacher`);
      toast({
        title: "Created sucessfully",
        description: "Teacher was created sucessfully",
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
              <Label className="font-bold " htmlFor="country">
                Date of Birth
              </Label>
              <Input
                type="text"
                placeholder="Eg. DD-MM-YYYY / 04-05-1996"
                value={formData.dob} // Add this line
                onChange={(e) => handleInputChange("dob", e.target.value)}
              />
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
                <SelectValue placeholder="choose marital status" />
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
              placeholder="Eg. Princess Doe ..."
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
              placeholder="Eg. +233245******"
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
              placeholder="Eg. Sister, Brother etch ..."
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
            <Label className="font-bold ">Level</Label>
            <Select
              value={formData.level}
              onValueChange={(onValueChange) =>
                handleInputChange("level", onValueChange)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Level ..." />
              </SelectTrigger>
              <SelectContent>
                {levels?.map((level) => (
                  <SelectItem key={level._id} value={level.name}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold ">Stage</Label>
            <Select
              value={formData.stage}
              onValueChange={(onValueChange) =>
                handleInputChange("stage", onValueChange)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Stage ..." />
              </SelectTrigger>
              <SelectContent>
                {stages?.map((stage) => (
                  <SelectItem key={stage._id} value={stage.name}>
                    {stage.name}
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
              placeholder="Eg. GHA-345*******-6"
              value={formData.idCard} // Add this line
              onChange={(e) => handleInputChange("idCard", e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-4">
            <Label className="font-bold ">Occupation</Label>
            <Input
              type="text"
              placeholder="Eg. Teacher"
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
              placeholder="Eg. John Doe ..."
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
            onClick={handleCreateTeacher}
            disabled={isLoading || !validateStep(2)}
          >
            {isLoading ? "Creating ..." : " Create teacher"}
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

export default EditTeacherForm;
