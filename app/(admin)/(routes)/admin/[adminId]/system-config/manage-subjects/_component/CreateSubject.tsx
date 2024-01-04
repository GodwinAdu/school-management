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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createSubject } from "@/lib/actions/subject.actions";

const formSchema = z.object({
  subjectName: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  subjectCredit: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  subjectHour: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  subjectLevel: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  subjectStage: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  subjectAttribute: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  status: z.boolean().optional()
});

const CreateSubjectForm = ({ levels, stages }) => {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectName: "",
      subjectCredit:"",
      subjectHour:"",
      subjectLevel:"",
      subjectStage:"",
      subjectAttribute:"",
      status:false,
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createSubject(values, path);
      router.push(`/admin/${params.adminId}/system-config/manage-subjects`);
      form.reset();
      toast({
        title: "Created Successfully",
        description: "Created subject successfully...",
      });
    } catch (error: any) {
      console.log("error happened while creating subject", error);
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
          <CardTitle>Subject Form</CardTitle>
          <CardDescription>
            Fill the necessary input to create new subject.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                <FormField
                  control={form.control}
                  name="subjectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. Mathematics or English"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjectCredit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Credits</FormLabel>
                      <FormControl>
                        <Input placeholder="Eg. 3.0 or 1.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjectHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Hours</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. 24 0r 10 (any hours)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjectLevel"
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
                  name="subjectStage"
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
                <FormField
                  control={form.control}
                  name="subjectAttribute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Attribute</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject attribute" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="selective">
                            Selective
                          </SelectItem>
                          <SelectItem value="compulsory">
                            Compulsory
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 md:mt-10">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Subject status</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "creating ..." : "submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateSubjectForm;
