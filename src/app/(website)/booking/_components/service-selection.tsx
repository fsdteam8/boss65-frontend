"use client";

import { Button } from "@/components/ui/button";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useBookingStore } from "@/store/booking/index";
import type { Service, ServiceResponse } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users } from "lucide-react";

// This file provides mock data for development and testing

export default function ServiceSelection() {
  const { room, setStep, categoryId } = useBookingStore();

  const roomId = room?._id;

  const { data, isLoading, isError, error } = useQuery<ServiceResponse>({
    queryKey: ["services"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/services/category/${categoryId}`
      ).then((res) => res.json()),
    enabled: !!roomId,
  });

  // Redirect if no room is selected
  if (!roomId) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium">Please select a room first</p>
        <Button
          onClick={() => setStep("rooms")}
          className="mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Go to Room Selection
        </Button>
      </div>
    );
  }

  let content;

  if (isLoading) {
    content = (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <SkeletonWrapper key={n} isLoading={isLoading}>
            <ServiceCard />
          </SkeletonWrapper>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="w-full flex justify-center items-center min-h-[300px] flex-col">
        <h1 className="text-lg font-semibold text-red-500">Error</h1>
        <p className="text-gray-400">
          {error?.message ?? "Something went wrong"}
        </p>
      </div>
    );
  } else if (data?.data.length === 0) {
    content = (
      <div className="w-full flex justify-center items-center min-h-[300px]">
        <h1 className="text-gray-400 text-lg">No Services Found</h1>
      </div>
    );
  } else {
    content = (
      <div className="grid md:grid-cols-2 gap-6">
        {data?.data.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
}

type ServiceCardProps = {
  service?: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const { setService } = useBookingStore();

  const serviceData = service;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{serviceData?.name}</h3>
          <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
            ${serviceData?.pricePerSlot}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-orange-500 text-white flex items-center gap-x-1">
            <Clock className="h-3 w-3" /> 3h
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-500 text-white flex items-center gap-x-1">
            <Users className="h-3 w-3" /> 1/5
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          {serviceData && (
            <Button
              onClick={() => setService(serviceData)}
              className="w-full bg-white border border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              Select
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
