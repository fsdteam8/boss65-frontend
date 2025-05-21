import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";

export function DashboardCards() {
  return (
    <div className="grid gap-[20px] md:grid-cols-2 lg:grid-cols-4 ">
      <Card className="space-y-[10px]">
        <CardHeader className="flex flex-row items-center justify-between  pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-[#000000]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-[10px]">123</div>
          <p className="text-xs text-muted-foreground text-[#008837]">
            +5.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="space-y-[10px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-[#000000]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-[10px] ">$12,543</div>
          <p className="text-xs text-muted-foreground text-[#008837]">
            +10.5% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="space-y-[10px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-[#000000]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-[10px]">573</div>
          <p className="text-xs text-muted-foreground text-[#008837]">
            +19% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="space-y-[10px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg. Booking Duration
          </CardTitle>
          <Clock className="h-4 w-4 text-[#000000]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-[10px]">3.2h</div>
          <p className="text-xs text-muted-foreground text-[#008837]">
            +0.1h from last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
