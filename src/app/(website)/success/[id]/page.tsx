import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmation() {
  return (
    <div className="my-32">
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardContent className="pt-6 px-6 pb-0">
          <div className="flex flex-col items-center mb-6">
            <div className="rounded-full bg-orange-500 p-2 mb-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-center">Thank You!</h2>
            <p className="text-center text-sm text-orange-500 mt-1">
              Your reservation is confirmed, get ready for a private experience
              crafted just for you. Check your email for all the details
            </p>
          </div>

          <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Booking ID :</span>
              <span className="text-gray-600">########</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Name :</span>
              <span className="text-gray-600">Deanna Curtis</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Email :</span>
              <span className="text-gray-600">deanna.curtis@example.com</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Phone :</span>
              <span className="text-gray-600">(907) 555-0101</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Category :</span>
              <span className="text-gray-600">Hourly</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Rooms :</span>
              <span className="text-gray-600">Space Room</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Services :</span>
              <span className="text-gray-600">Early Bird</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Time :</span>
              <span className="text-gray-600">12/15/2025 - 10:30 AM</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
