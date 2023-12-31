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
import { loginAdminUsers } from "@/lib/actions/login.actions";
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

  const {isSubmitting} = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.role === "teacher") {
        toast({
          title: "Teacher login",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      } else if (values.role === "oter") {
        toast({
          title: "Student login",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      } else {
        try {
          const currentUser = await loginAdminUsers({
            userName:values.username,
            password:values.password
          })
          
          if (currentUser) {
            router.push(`/admin/${currentUser._id}`);
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
        } catch (error:any) {
          toast({
            title: "something went wrong",
            description: "Please try again later",
            variant:"destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Teacher login",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Username" {...field} />
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="liberian">Liberian</SelectItem>
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
            {isSubmitting ? "Loging in..." : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
