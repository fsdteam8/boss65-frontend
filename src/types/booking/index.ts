export type BookingStatus = "confirmed" | "canceled" | "refunded";

export interface Booking {
  id: string;
  name: string;
  category: string;
  room: string;
  numberOfPeople: number;
  services: string;
  date: string;
  time: string;
  amount: string;
  status: BookingStatus;
}
