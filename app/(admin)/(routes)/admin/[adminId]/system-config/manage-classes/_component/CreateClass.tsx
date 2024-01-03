"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createClass } from "@/lib/actions/class.actions";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  level: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  stage: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
});

const CreateClass = ({ levels, classrooms, stages }) => {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      level: "",
      stage: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>){
    try {
      await createClass(values, path);
      router.push(`/admin/${params.adminId}/system-config/manage-classes`);
      form.reset();
      toast({
        title: "Created Successfully",
        description: "Created class  successfully...",
      });
    } catch (error: any) {
      console.log("error happened while creating class", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Class Form</CardTitle>
          <CardDescription>
            Fill the necessary input to create new class.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter name for class (any)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels?.length === 0 ? (
                            <SelectItem
                              value="none"
                              className="text-xs "
                              disabled
                            >
                              No levels found. Create a new level.
                            </SelectItem>
                          ) : (
                            levels?.map((level) => (
                              <SelectItem key={level?._id} value={level?.name}>
                                {level?.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Stage</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stages?.length === 0 ? (
                            <SelectItem
                              value="none"
                              className="text-xs "
                              disabled
                            >
                              No stages found. Create a new stage.
                            </SelectItem>
                          ) : (
                            stages?.map((stage) => (
                              <SelectItem key={stage?._id} value={stage?.name}>
                                {stage?.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </div>
              <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "creating ...":"submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateClass;
