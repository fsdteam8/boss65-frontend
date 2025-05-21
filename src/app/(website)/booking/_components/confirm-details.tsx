"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useBookingStore } from "@/store/booking";

const bookingSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  specialRequirements: z.string().optional(),
  numberOfPeople: z.number().min(1, "At least one person"),
  promoCode: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function ConfirmDetails() {
  const {
    categoryId,
    room,
    service,
    selectedTimeSlot,
    selectedDate,
    setStep,
    selectedCategoryName,
  } = useBookingStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequirements: "",
      numberOfPeople: 1,
      promoCode: "",
    },
  });

  const roomId = room?._id;
  const mockData = {
    category: { id: "1", name: selectedCategoryName },
    room: { id: "1", name: room?.title },
    service: {
      id: "1",
      name: service?.name,
      price: service?.pricePerSlot ?? 0,
    },
  };

  if (!categoryId || !roomId || !service || !selectedTimeSlot) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium">
          Please complete all previous steps first
        </p>
        <Button
          onClick={() => setStep("category")}
          className="mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Start Booking
        </Button>
      </div>
    );
  }

  const handleSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    console.log("Submitted booking:", data);
    // Simulate API request here...
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Your Information</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-orange-500">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="User First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-orange-500">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="User Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-orange-500">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="User Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-orange-500">Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="User Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-orange-500">
                    Special Requirements
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfPeople"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-orange-500">
                    Number of People
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      disabled={field.value <= 1}
                      onClick={() => field.onChange(field.value - 1)}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(+e.target.value)}
                      className="w-16 text-center"
                      min={1}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => field.onChange(field.value + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promoCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-orange-500">Promo Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Use promo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {isSubmitting ? "Processing..." : "Book Now"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-medium text-center mb-6">
          {mockData.service.name}
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {selectedTimeSlot
                ? format(selectedDate!, "MM-dd-yyyy")
                : "Not selected"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{mockData.category.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Room:</span>
            <span className="font-medium">{mockData.room.name}</span>
          </div>

          <div className="border-t pt-4 mt-6 flex justify-between items-center">
            <span className="font-medium">Total for booking:</span>
            <span className="text-xl font-bold">
              ${mockData.service.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
