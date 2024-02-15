"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { loginAdminUsers, loginStudent, loginTeacher } from "@/lib/actions/login.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be 5 or more",
  }),
  role: z.string().min(1, {
    message: "role must be at least 2 or more.",
  }),
});

const LoginForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.role === "teacher") {
        try {
          const teacher = await loginTeacher({
            userName: values.username,
            password: values.password
          })
          form.reset();
          if (teacher) {
            router.push(`/teacher/${teacher._id}`);
            toast({
              title: "Login successfully",
              description: `Welcome, ${teacher.firstName}, You've logged in successfully`,
            });
          } else {
            toast({
              title: "Invalid credentials",
              description: "Please make sure you enter the correct credentials and try again later",
              variant: "destructive",
            });
          }
        } catch (error: any) {
          console.log(error)
          toast({
            title: "something went wrong",
            description: "Please try again later",
            variant: "destructive"
          });
        }
      } else if (values.role === "student") {
        try {
          const student = await loginStudent({
            userName: values.username,
            password: values.password
          })
          form.reset();
          if (student) {
            router.push(`/student/${student._id}`);
            toast({
              title: "Login successfully",
              description: `Welcome, ${student.firstName}, You've logged in successfully`,
            });
          } else {
            toast({
              title: "Invalid credentials",
              description: "Please make sure you enter the correct credentials and try again later",
              variant: "destructive",
            });
          }
        } catch (error: any) {
          console.log(error)
          toast({
            title: "something went wrong",
            description: "Please try again later",
            variant: "destructive"
          });
        }
      } else {
        try {
          const currentUser = await loginAdminUsers({
            userName: values.username,
            password: values.password
          })
          form.reset();
          if (currentUser) {
           window.location.assign(`/admin/${currentUser._id}`);
            toast({
              title: "Login successfully",
              description: `Welcome, ${currentUser.firstName}, You've logged in successfully`,
            });
          } else {
            toast({
              title: "Invalid credentials",
              description: "Please make sure you enter the correct credentials and try again later",
              variant: "destructive",
            });
          }
        } catch (error: any) {
          toast({
            title: "something went wrong",
            description: "Please try again later",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Couldnt login",
        description: `Error happened ${error}`,
        variant: "destructive"
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Username"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Select role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="w-full text-center" type="submit">
            {isSubmitting ? "Signing in..." : "Log In"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
