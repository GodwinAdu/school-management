"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createLevel } from "@/lib/actions/level.actions";
import { createDay } from "@/lib/actions/day.actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

export function DayModal() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createDay({
        name: values.name,
      });
      router.refresh();
      form.reset();
      toast({
        title: "New day created",
        description: "New day was added successfully...",
      });
    } catch (error: any) {
      console.log("error happened while creating day", error);
      toast({
        title: "Somethin went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[96%]">
        <DialogHeader>
          <DialogTitle>Create School Days</DialogTitle>
          <DialogDescription>Create new School Days .</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Day</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg. Monday - Sunday"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Creating..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
