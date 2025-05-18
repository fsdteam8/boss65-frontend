import { BookingTabs } from "./_components/booking-tabs";

const Page = () => {
  return (
    <main className="flex-1 container mx-auto px-4 my-[100px]">
      <h1 className="text-3xl font-bold text-center mb-8">BOOK NOW!</h1>
      <BookingTabs />
    </main>
  );
};

export default Page;
