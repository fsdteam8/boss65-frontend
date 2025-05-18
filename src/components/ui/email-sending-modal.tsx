"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode, useState } from "react";

// Define the form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Email body is required" }),
});

type EmailFormValues = z.infer<typeof formSchema>;

interface EmailModalProps {
  recipientEmail?: string;
  trigger: ReactNode;
}

export default function EmailSendingModal({
  recipientEmail = "",
  trigger,
}: EmailModalProps) {
  const [open, onOpenChange] = useState(false);
  // Initialize the form with default values
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: recipientEmail,
      subject: "",
      body: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: EmailFormValues) => {
    console.log("Email data:", data);
    // Here you would typically send the email via an API
    alert("Email sent successfully!");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      </DialogHeader>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-500">
            Send Email
          </DialogTitle>
        </DialogHeader>
        <div className="border-t border-orange-200 my-2"></div>
        <div className="bg-gray-50 p-4 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <FormLabel className="text-right">Email:</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-white" />
                    </FormControl>
                    <FormMessage className="col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <FormLabel className="text-right">Subject:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage className="col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[80px_1fr] items-start gap-4">
                    <FormLabel className="text-right pt-2">Body:</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          placeholder="Text"
                          className="min-h-[200px] resize-none bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
