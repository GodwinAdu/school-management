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
import { createTerm } from "@/lib/actions/term.actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createLevel } from "@/lib/actions/level.actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

export function LevelModal() {
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
      await createLevel({
        name: values.name,
      });
      router.refresh();
      form.reset();
      toast({
        title: "New term created",
        description: "New term was added successfully...",
      });
    } catch (error: any) {
      console.log("error happened while creating term", error);
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
          <DialogTitle>Create School Levels</DialogTitle>
          <DialogDescription>Create new School Levels .</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Level</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg. Primary or Secondary"
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
