"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPassword, ForgetPasswordType } from "@/schemas/auth";
import Cookies from "js-cookie"; // Import js-cookie for cookie retrieval
// import { useRouter } from "next/navigation";

// Retrieve cookies for email and "Remember Me"
const rememberedEmail = Cookies.get("rememberMeEmail");

export function ForgotPasswordForm() {

//   const router = useRouter();

  // Initialize the form
  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPassword),
    defaultValues: {
      email: rememberedEmail ?? "",
    },
  });

  // Handle form submission
  async function onSubmit(data: ForgetPasswordType) {
    console.log(data)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {/* Email field */}
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                      className="w-full h-[50px] border border-black rounded-[8px] text-base font-normal font-poppins leading-[120%] pl-10  tracking-[0%] text-black placeholder:text-[#999999] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 "
                      
                      startIcon={Mail}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full h-[52px] bg-[#FF6900] rounded-[8px] py-[15px] px-[157px] text-lg font-semibold font-poppins leading-[120%] tracking-[0%] text-[#F4F4F4]"
        //   disabled={loading}
        >
          Send OTP
        </button>
      </form>
    </Form>
  );
}
