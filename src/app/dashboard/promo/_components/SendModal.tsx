"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";

interface SendPromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  promoCode: string;
}

export default function SendModal({ isOpen, onClose, promoCode }: SendPromoCodeModalProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Your Exclusive Promo Code!");
  const [body, setBody] = useState(`Use this code "${promoCode}" to enjoy your discount.`);

  // const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI4MGYxMmI4OTQ1OGY4MGRiNzRjNzUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzgwMTcyMCwiZXhwIjoxNzQ4NDA2NTIwfQ.XM3apv4H6GvIyKZ8W66nIMBWe5osk62Jn3FzpXxzZ4I";


  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (!email || !subject || !body) {
      toast.error("All fields are required.");
      return;
    }
    console.log({
    email,
    subject,
    body,
    code: promoCode,
  });

    try {
      toast.loading("Sending promo code...", { id: "sendToast" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo-codes/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, subject, body, promoCode: promoCode }),
      });

      if (!res.ok) throw new Error("Failed to send email");

      toast.success("Promo code sent successfully!", { id: "sendToast" });
      onClose();
    } catch (error) {
      toast.error(`Failed to send email${error instanceof Error ? `: ${error.message}` : ""}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-[#FF6B00]">
              Send Promo Code
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-5 w-5 text-[#FF6B00]" />
            </Button>
          </div>
          <div className="w-full h-[1px] bg-[#FF6B00] mt-4"></div>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-4">
          <div className="space-y-2">
            <Label>Promo Code:</Label>
            <Input readOnly value={promoCode} className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Subject:</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Body:</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-gray-50 min-h-[200px] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 pt-2 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 border-0 text-gray-700"
          >
            Cancel
          </Button>
          <Button onClick={handleSend} className="bg-[#FF6B00] hover:bg-[#e05f00] text-white">
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

