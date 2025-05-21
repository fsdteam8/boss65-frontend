"use client";

import type React from "react";
import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, Play, Pause, CloudUpload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema with zod
const formSchema = z.object({
  section: z.string().min(1, { message: "Please select a section" }),
  placement: z.string().min(1, { message: "Please select a placement" }),
  video: z
    .any()
    .refine((file) => file !== null, { message: "Please upload a video" }),
});

type FormValues = z.infer<typeof formSchema>;

interface VideoUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: FormValues) => void;
}

export function AddUploadModal({
  open,
  onOpenChange,
  onSave,
}: VideoUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section: "",
      placement: "",
      video: null,
    },
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        handleVideoChange(file);
      } else {
        alert("Please upload a valid video file");
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("video/")) {
        handleVideoChange(file);
      } else {
        alert("Please upload a valid video file");
      }
    }
  };

  const handleVideoChange = (file: File) => {
    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Set the video in the form
    form.setValue("video", file, { shouldValidate: true });

    // Create preview
    const videoUrl = URL.createObjectURL(file);
    setPreview(videoUrl);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onSubmit = (data: FormValues) => {
    onSave(data);
    resetForm();
    onOpenChange(false);

    console.log("Form data submitted:", data);
  };

  const resetForm = () => {
    form.reset();
    setPreview(null);
    setIsPlaying(false);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between pb-[15px]">
            <DialogTitle className="text-2xl md:text-[28px] lg:text-[32px] font-semibold font-poppins leading-[120%] tracking-[0%] text-[#FF6600]">
              Add Videos
            </DialogTitle>
            <DialogClose className="text-[#FF6600] hover:text-[#FF6600]/80">
              <X className="h-6 w-6" />
            </DialogClose>
          </div>
          <div className="h-[2px] w-full bg-[#FF6900] "></div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 py-4"
          >
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem className="space-y-[10px]">
                  <FormLabel className="text-base font-poppins font-medium text-[#FF6900] leading-[120%] tracking-[0%] ">
                    Section
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    
                  >
                    <FormControl>
                      <SelectTrigger className="h-[44px] w-full border border-[#E5E7EB] bg-white text-[#333333] font-normal font-poppins text-base leading-[120%] tracking-[0%] outline-none focus:outline-none focus:ring-0">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="header">Header</SelectItem>
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="gallery">Video Gallery</SelectItem>
                      <SelectItem value="testimonials">Testimonials</SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placement"
              render={({ field }) => (
                <FormItem className="space-y-[10px]">
                  <FormLabel className="text-base font-poppins font-medium text-[#FF6900] leading-[120%] tracking-[0%]">
                    Placement
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[44px] w-full border border-[#E5E7EB] bg-white text-[#333333] font-normal font-poppins text-base leading-[120%] tracking-[0%] outline-none focus:outline-none focus:ring-0">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="13">13</SelectItem>
                      <SelectItem value="14">14</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem className="space-y-[10px]">
                  <FormLabel className="text-base font-poppins font-medium text-[#FF6900] leading-[120%] tracking-[0%]">
                    Upload Video
                  </FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "border-2 border-[#E5E7EB] rounded-md text-center cursor-pointer transition-colors",
                        isDragging
                          ? "border-[#FF6600] bg-[#FF6600]/5"
                          : "border-gray-300 ",
                        preview ? "p-2" : "p-8"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() =>
                        document.getElementById("video-upload")?.click()
                      }
                    >
                      {isUploading && (
                        <div className="mb-4 px-4">
                          <p className="text-sm text-gray-500 mb-2">
                            Uploading... {uploadProgress}%
                          </p>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      {preview ? (
                        <div className="h-[190px] relative">
                          <video
                            ref={videoRef}
                            src={preview}
                            className="max-h-[190px] w-full mx-auto rounded-md object-contain bg-black"
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
                              {isPlaying ? (
                                <Pause className="h-5 w-5 text-white" />
                              ) : (
                                <Play className="h-5 w-5 text-white" />
                              )}
                              <span className="sr-only">
                                {isPlaying ? "Pause" : "Play"} video
                              </span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black/50 border-0 hover:bg-black/70"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreview(null);
                              form.setValue("video", null);
                              setIsPlaying(false);
                            }}
                          >
                            <X className="h-4 w-4 text-white" />
                            <span className="sr-only">Remove video</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="h-[140px] flex flex-col items-center justify-center gap-2 py-4">
                          
                          <CloudUpload className="h-[40px] w-[40px] text-gray-400" />
                          {/* <p className="text-sm text-gray-500">
                            Drag and drop your video here or click to browse
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Supports: MP4, WebM, MOV (Max 100MB)
                          </p> */}
                        </div>
                      )}
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        {...field}
                        onChange={(e) => {
                          handleFileInput(e);
                          field.onChange(e);
                        }}
                        value=""
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center items-center gap-[30px] mt-4">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                className="bg-[#D9D9D9] rounded-[8px] py-3 px-6 text-black font-poppins font-medium text-base leading-[120%] tracking-[0%]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !form.formState.isValid}
                className="bg-[#FF6900] rounded-[8px] py-3 px-6 text-white font-poppins font-medium text-base leading-[120%] tracking-[0%]"
              >
                Save
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
