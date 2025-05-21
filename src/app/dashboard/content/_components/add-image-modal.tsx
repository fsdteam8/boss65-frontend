"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: ImageUploadData) => void
}

interface ImageUploadData {
  section: string
  placement: string
  image: File | null
}

export function AddImageModal({ open, onOpenChange, onSave }: ImageUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [formData, setFormData] = useState<ImageUploadData>({
    section: "",
    placement: "",
    image: null,
  })
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0])
    }
  }

  const handleImageChange = (file: File) => {
    setFormData((prev) => ({ ...prev, image: file }))

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    onSave(formData)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setFormData({
      section: "",
      placement: "",
      image: null,
    })
    setPreview(null)
  }

  const isFormValid = formData.section && formData.placement && formData.image

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#FF6600]">Add Image</DialogTitle>
            <DialogClose className="text-[#FF6600] hover:text-[#FF6600]/80">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="h-[1px] w-full bg-[#FF6600]/20 mt-4"></div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="section" className="text-lg font-medium text-[#FF6600]">
              Section
            </Label>
            <Select
              value={formData.section}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, section: value }))}
            >
              <SelectTrigger id="section" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="header">Header</SelectItem>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="gallery">Gallery</SelectItem>
                <SelectItem value="testimonials">Testimonials</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="placement" className="text-lg font-medium text-[#FF6600]">
              Placement
            </Label>
            <Select
              value={formData.placement}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, placement: value }))}
            >
              <SelectTrigger id="placement" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="background">Background</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image" className="text-lg font-medium text-[#FF6600]">
              Upload Image
            </Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors",
                isDragging ? "border-[#FF6600] bg-[#FF6600]/5" : "border-gray-300 hover:border-[#FF6600]/50",
                preview ? "p-2" : "p-8",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {preview ? (
                <div className="relative">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="max-h-[200px] mx-auto rounded-md object-contain"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setPreview(null)
                      setFormData((prev) => ({ ...prev, image: null }))
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500">Drag and drop your image here or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG, GIF (Max 5MB)</p>
                </div>
              )}
              <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm()
              onOpenChange(false)
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 border-0"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isFormValid}
            className="bg-[#FF6600] hover:bg-[#FF6600]/90 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
