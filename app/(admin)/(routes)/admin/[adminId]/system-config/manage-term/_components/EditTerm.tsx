"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createTerm, updateTerm } from "@/lib/actions/term.actions";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface EditTermProps {
  _id: string;
  name: string;
  createdby: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  createdBy: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

export function EditTerm({ initialData }: EditTermProps) {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  const termId : string | string[] = params.termEditId;
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateTerm(termId,values, path);
      router.push(`/admin/${params.adminId}/system-config/manage-term`);
      form.reset();
      toast({
        title: "Update Successfully",
        description: "Update term  successfully...",
      });
    } catch (error: any) {
      console.log("error happened while updating term", error);
      toast({
        title: "Somethin went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto max-w-xl w-[96%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Term Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Term or Semister" {...field} />
                </FormControl>
                <FormDescription>
                  It can be a term or a semister. eg.first term or semister 1.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Created by</FormLabel>
                <FormControl>
                  <Input placeholder="Enter created By" {...field} />
                </FormControl>
                <FormDescription>
                  You can change to suit your needs...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
