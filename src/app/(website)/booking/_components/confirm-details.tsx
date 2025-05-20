"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBookingStore } from "@/store/booking/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequirements: string;
  numberOfPeople: number;
  promoCode: string;
}

export default function ConfirmDetails() {
  const {
    categoryId,
    roomId,
    serviceId,
    selectedTimeSlot,
    setStep,
    selectedCategoryName,
  } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequirements: "",
    numberOfPeople: 1,
    promoCode: "",
  });

  const {} = useQuery({
    queryKey: ["service"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/services/${serviceId}`
      ).then((res) => res.json()),
  });

  // Mock data for demonstration
  const mockData = {
    category: { id: "1", name: selectedCategoryName },
    room: { id: "1", name: "Dungeon Room" },
    service: { id: "1", name: "M-F 3hrs 12-6pm", price: 99.0 },
  };

  // Redirect if any required booking data is missing
  if (!categoryId || !roomId || !serviceId || !selectedTimeSlot) {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const incrementPeople = () => {
    setFormData((prev) => ({
      ...prev,
      numberOfPeople: prev.numberOfPeople + 1,
    }));
  };

  const decrementPeople = () => {
    if (formData.numberOfPeople > 1) {
      setFormData((prev) => ({
        ...prev,
        numberOfPeople: prev.numberOfPeople - 1,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Your Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-orange-500 mb-1"
              >
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="User First Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-orange-500 mb-1"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="User Last Name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-orange-500 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="User Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-orange-500 mb-1"
              >
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="User Phone Number"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="specialRequirements"
              className="block text-sm font-medium text-orange-500 mb-1"
            >
              Special Requirements
            </label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              placeholder="Details"
              rows={3}
            />
          </div>

          <div>
            <label
              htmlFor="numberOfPeople"
              className="block text-sm font-medium text-orange-500 mb-1"
            >
              Number Of People
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementPeople}
                className="border rounded-md w-8 h-8 flex items-center justify-center"
                disabled={formData.numberOfPeople <= 1}
              >
                -
              </button>
              <Input
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                className="w-16 mx-2 text-center"
                min={1}
                required
              />
              <button
                type="button"
                onClick={incrementPeople}
                className="border rounded-md w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-medium text-center mb-6">
          {mockData.service.name}
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            {/* <span className="font-medium">
              {selectedTimeSlot
                ? format(selectedTimeSlot?.start, "MM-dd-yyyy") +
                  " " +
                  selectedTimeSlot.end
                : "Not selected"}
            </span> */}
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{mockData.category.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Rooms:</span>
            <span className="font-medium">{mockData.room.name}</span>
          </div>

          <div className="pt-2">
            <label
              htmlFor="promoCode"
              className="block text-sm font-medium text-orange-500 mb-1"
            >
              Promo Code
            </label>
            <Input
              id="promoCode"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              placeholder="Use promo"
            />
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total for booking:</span>
              <span className="text-xl font-bold">
                ${mockData.service.price.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
