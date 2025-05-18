import { BookingTrends } from "./_components/booking-trends";
import { CustomerTypes } from "./_components/customer-types";
import { DashboardCards } from "./_components/dashboard-cards";
import { DashboardHeader } from "./_components/dashboard-header";
import { RecentBookings } from "./_components/recent-booking";
import { RevenueTrends } from "./_components/revenue-trends";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardCards />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-full">
          <BookingTrends />
        </div>
        <div className="h-full">
          <RecentBookings />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <CustomerTypes />
        </div>
        <div className="md:col-span-2">
          <RevenueTrends />
        </div>
      </div>
    </div>
  );
}
