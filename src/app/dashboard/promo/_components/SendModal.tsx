"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface SendPromoCodeModalProps {
  isOpen: boolean
  onClose: () => void
  promoCode: string
}

export default function SendPromoCodeModal({ isOpen, onClose, promoCode }: SendPromoCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-[#FF6B00]">Send Promo Code</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="promo-code">Promo Code:</Label>
            <Input id="promo-code" value={promoCode || "######"} readOnly className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <div className="flex gap-2">
              <Input id="email" value="razababu@gail.com , razababu@g..." className="bg-gray-50 flex-1" />
              <Button className="bg-[#FF6B00] hover:bg-[#e05f00] text-white">Bulk</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject :</Label>
            <Input id="subject" value="Space Room" className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Body :</Label>
            <Textarea id="body" value="Text" className="bg-gray-50 min-h-[200px] resize-none" />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 pt-2 border-t">
          <Button variant="outline" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 border-0 text-gray-700">
            Cancel
          </Button>
          <Button className="bg-[#FF6B00] hover:bg-[#e05f00] text-white">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
