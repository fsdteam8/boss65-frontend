"use client"

import React from "react"

import { useState } from "react"
import { X, Upload, Play, Pause } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface VideoUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: VideoUploadData) => void
}

interface VideoUploadData {
  section: string
  placement: string
  video: File | null
}

export function AddUploadModal({ open, onOpenChange, onSave }: VideoUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [formData, setFormData] = useState<VideoUploadData>({
    section: "",
    placement: "",
    video: null,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

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
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        handleVideoChange(file)
      } else {
        alert("Please upload a valid video file")
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("video/")) {
        handleVideoChange(file)
      } else {
        alert("Please upload a valid video file")
      }
    }
  }

  const handleVideoChange = (file: File) => {
    // Simulate upload progress
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)

    setFormData((prev) => ({ ...prev, video: file }))

    // Create preview
    const videoUrl = URL.createObjectURL(file)
    setPreview(videoUrl)
  }

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
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
      video: null,
    })
    setPreview(null)
    setIsPlaying(false)
    setUploadProgress(0)
    setIsUploading(false)
  }

  const isFormValid = formData.section && formData.placement && formData.video

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#FF6600]">Add Videos</DialogTitle>
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
                <SelectItem value="gallery">Video Gallery</SelectItem>
                <SelectItem value="testimonials">Testimonials</SelectItem>
                <SelectItem value="background">Background</SelectItem>
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
                <SelectItem value="fullwidth">Full Width</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="video" className="text-lg font-medium text-[#FF6600]">
              Upload Video
            </Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-md text-center cursor-pointer transition-colors",
                isDragging ? "border-[#FF6600] bg-[#FF6600]/5" : "border-gray-300 hover:border-[#FF6600]/50",
                preview ? "p-2" : "p-8",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("video-upload")?.click()}
            >
              {isUploading && (
                <div className="mb-4 px-4">
                  <p className="text-sm text-gray-500 mb-2">Uploading... {uploadProgress}%</p>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {preview ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={preview}
                    className="max-h-[200px] w-full mx-auto rounded-md object-contain bg-black"
                    onEnded={() => setIsPlaying(false)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-black/50 border-0 hover:bg-black/70"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                      <span className="sr-only">{isPlaying ? "Pause" : "Play"} video</span>
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black/50 border-0 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation()
                      setPreview(null)
                      setFormData((prev) => ({ ...prev, video: null }))
                      setIsPlaying(false)
                    }}
                  >
                    <X className="h-4 w-4 text-white" />
                    <span className="sr-only">Remove video</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500">Drag and drop your video here or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">Supports: MP4, WebM, MOV (Max 100MB)</p>
                </div>
              )}
              <input id="video-upload" type="file" accept="video/*" className="hidden" onChange={handleFileInput} />
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
            disabled={!isFormValid || isUploading}
            className="bg-[#FF6600] hover:bg-[#FF6600]/90 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
