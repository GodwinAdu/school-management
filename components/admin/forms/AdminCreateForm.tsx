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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createAdmin } from "@/lib/actions/admin.actions";

const AdminCreateForm = () => {
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
          !!formData.currentAddress
        );

      case 2:
        // Check if all fields for step 2 are filled
        return !!formData.role;

      default:
        return false;
    }
  };

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const items = [];
  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const currentStore = formattedItems?.find(
    (item) => item.value === params.adminId
  );

  const onSelectStore = (store: { value: string; label: string }) => {
    // setOpen(false);
    // router.push(`/${store.value}`);
  };

  const handleCreateAdmin = async () => {
    const {
      firstName,
      userName,
      password,
      middleName,
      lastName,
      email,
      dob,
      gender,
      phone,
      role,
      maritalStatus,
      country,
      state,
      city,
      permanentAddress,
      currentAddress,
    } = formData;
    try {
      setIsLoading(true);
      await createAdmin({
        firstName,
        userName,
        password,
        middleName,
        lastName,
        email,
        dob,
        gender,
        phone,
        role,
        maritalStatus,
        country,
        state,
        city,
        permanentAddress,
        currentAddress,
        path,
      });
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
        <Step onClick={() => setActiveStep(2)}>
          <Check className="h-5 w-5" />
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
            <div className=" w-full flex flex-col gap-2">
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
                    mode="single"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className=" w-full flex flex-col gap-2">
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
          <div className=" w-full flex flex-col gap-2">
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
          <div className=" w-full flex flex-col gap-2">
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
          <div className=" w-full flex flex-col gap-2">
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
          <div className=" w-full flex flex-col gap-2">
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
        </div>
      )}
      {activeStep === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className=" w-full flex flex-col gap-2">
            <Label className="font-bold " htmlFor="Role">
              Role
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  aria-expanded={open}
                  className={cn("w-full justify-between")}
                >
                  <User className="w-4 h-4 mr-2" />
                  User role
                  <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search store..." />
                  <CommandEmpty>No store found.</CommandEmpty>
                  <CommandGroup heading="Stores">
                    {formattedItems?.map((store) => (
                      <CommandItem
                        key={store.value}
                        value={store.value}
                        onSelect={() => onSelectStore(store)}
                        className="text-sm"
                      >
                        <User className="mr-2 h-4 w-4" />
                        {store.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            currentStore?.value === store?.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                          //   storeModal.onOpen();
                        }}
                      >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Create Role
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className=" w-full flex flex-col gap-2">
            <Label className="font-bold " htmlFor="picture">
              Amount pay
            </Label>
            <Input
              type="text"
              placeholder="First Name"
              value={formData.role} // Add this line
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          {/* <div className=" w-fflex flex-col gap-2ull ">
            <Label className="font-bold " htmlFor="picture">Picture</Label>
            <Input
              type="text"
              placeholder="First Name"
              value={formData.firstName} // Add this line
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div> */}
        </div>
      )}
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>

        {isLastStep ? (
          <Button onClick={handleCreateAdmin} disabled={isLoading}>
            Create Admin
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
