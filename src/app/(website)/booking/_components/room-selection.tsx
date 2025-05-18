"use client";

import { Button } from "@/components/ui/button";
import { useBookingStore, type Room } from "@/store/booking/index";
import Image from "next/image";

export default function RoomSelection() {
  const { selectRoom, selectCategory } = useBookingStore();

  // Redirect if no category is selected
  if (!selectCategory) {
    return (
      <div className="text-center py-8">
        <p>Please select a category first</p>
        <Button
          onClick={() => useBookingStore.getState().setStep("category")}
          className="mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Go to Category Selection
        </Button>
      </div>
    );
  }

  const rooms = [
    {
      id: "dungeon" as Room,
      name: "Dungeon Room",
      image: "/dark-brick-room-screen.png",
    },
    {
      id: "japanese" as Room,
      name: "Japanese Room",
      image: "/japanese-room.png",
    },
    {
      id: "jungle" as Room,
      name: "Jungle Room",
      image: "/jungle-room.png",
    },
    {
      id: "mystery" as Room,
      name: "Mystery Room",
      image: "/mystery-room.png",
    },
    {
      id: "space" as Room,
      name: "Space Room",
      image: "/space-room.png",
    },
    {
      id: "wizard" as Room,
      name: "Wizard Room",
      image: "/wizard-room.png",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div key={room.id} className="relative overflow-hidden rounded-lg h-64">
          <div className="absolute inset-0">
            <Image
              src={room.image || "/placeholder.svg"}
              alt={room.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute top-6 left-6">
            <h3 className="text-white text-2xl font-bold">{room.name}</h3>
          </div>
          <div className="absolute bottom-6 inset-x-6">
            <Button
              onClick={() => selectRoom(room.id)}
              variant="outline"
              className="w-full border border-white/70 bg-transparent text-white hover:bg-white/20 hover:text-white transition-colors"
            >
              Select
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
