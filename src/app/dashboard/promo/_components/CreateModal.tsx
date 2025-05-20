"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

interface CreatePromoCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePromoCodeModal({ isOpen, onClose }: CreatePromoCodeModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date("2025-04-12"))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-[#FF6B00]">Create New Promo Code</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="promo-code">Promo Code :</Label>
            <Input id="promo-code" value="######" className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount-type">Discount Type :</Label>
            <Select defaultValue="percentage">
              <SelectTrigger id="discount-type" className="bg-gray-50">
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount-value">Discount Value :</Label>
            <Input id="discount-value" value="10%" className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration-date">Expiration Date :</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-gray-50 border-input">
                  {date ? format(date, "M/d/yyyy") : "Select date"}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usage-limit">Usage Limit :</Label>
            <Input id="usage-limit" value="100" className="bg-gray-50" />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 pt-2 border-t">
          <Button variant="outline" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 border-0 text-gray-700">
            Cancel
          </Button>
          <Button className="bg-[#FF6B00] hover:bg-[#e05f00] text-white">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
