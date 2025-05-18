import { create } from "zustand";

export type CategoryName = "Hourly" | "Packages";
export type Room =
  | "dungeon"
  | "japanese"
  | "jungle"
  | "mystery"
  | "space"
  | "wizard";
export type Service = {
  id: string;
  name: string;
  time: string;
  price: number;
};

export type TimeSlot = {
  id: string;
  start: string;
  end: string;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequirements: string;
  numberOfPeople: number;
};

interface BookingState {
  currentStep: "category" | "rooms" | "services" | "time" | "confirm";
  selectedCategoryName: CategoryName | null;
  categoryId: string | null; // <-- Add this line

  selectedRoom: Room | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  userInfo: UserInfo;

  // Actions
  setStep: (step: BookingState["currentStep"]) => void;
  selectCategory: (category: CategoryName, categoryId: string) => void;
  selectRoom: (room: Room) => void;
  selectService: (service: Service) => void;
  selectDate: (date: Date) => void;
  selectTimeSlot: (timeSlot: TimeSlot) => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  incrementPeople: () => void;
  decrementPeople: () => void;
  resetSelection: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: "category",
  selectedCategoryName: null,
  categoryId: null, // <-- Initialize here

  selectedRoom: null,
  selectedService: null,
  selectedDate: null,
  selectedTimeSlot: null,
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequirements: "",
    numberOfPeople: 1,
  },

  setStep: (step) => set({ currentStep: step }),
  selectCategory: (category: CategoryName, categoryId: string) =>
    set({
      selectedCategoryName: category,
      categoryId,
      currentStep: "rooms",
    }),
  selectRoom: (room) => set({ selectedRoom: room, currentStep: "services" }),
  selectService: (service) =>
    set({ selectedService: service, currentStep: "time" }),
  selectDate: (date) => set({ selectedDate: date }),
  selectTimeSlot: (timeSlot) =>
    set({
      selectedTimeSlot: timeSlot,
      currentStep: "confirm",
    }),
  updateUserInfo: (info) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...info },
    })),
  incrementPeople: () =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        numberOfPeople: Math.min(state.userInfo.numberOfPeople + 1, 10),
      },
    })),
  decrementPeople: () =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        numberOfPeople: Math.max(state.userInfo.numberOfPeople - 1, 1),
      },
    })),
  resetSelection: () =>
    set({
      selectedCategoryName: null,
      categoryId: null, // <-- Reset it here
      selectedRoom: null,
      selectedService: null,
      selectedDate: null,
      selectedTimeSlot: null,
      userInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequirements: "",
        numberOfPeople: 1,
      },
      currentStep: "category",
    }),
}));
