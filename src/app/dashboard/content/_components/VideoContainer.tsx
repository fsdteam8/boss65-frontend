/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Pagination } from "@/components/ui/pagination";
import { Plus, Trash2 } from "lucide-react";
// import Image from "next/image";
import React, { useState, useMemo } from "react";
import { AddUploadModal } from "./add-video-modal";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const VideoContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const queryClient = useQueryClient();

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  console.log("token", token);

  const handleSave = (data: any) => {
    console.log("Saved data:", data);
  };

  const imageData = useMemo(
    () => [
      {
        id: 1,
        image: "/images/content_image.jpg",
        section: "Gallery",
        size: "6.8 mb",
      },
      {
        id: 2,
        image: "/images/content_image.jpg",
        section: "Gallery",
        size: "6.8 mb",
      },
      {
        id: 3,
        image: "/images/content_image.jpg",
        section: "Gallery",
        size: "6.8 mb",
      },
      {
        id: 4,
        image: "/images/content_image.jpg",
        section: "Gallery",
        size: "6.8 mb",
      },
      {
        id: 5,
        image: "/images/content_image.jpg",
        section: "Gallery",
        size: "6.8 mb",
      },
      {
        id: 6,
        image: "/images/content_image.jpg",
        section: "Gallery ff",
        size: "6.8 mb",
      },
    ],
    []
  );

  const { data } = useQuery({
    queryKey: ["contentVideo"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/assets?type=video`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
  });
  const contentImage = data?.data || [];

  const mutation = useMutation({
    mutationFn: async (id: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit blog");
      }

      return res.json();
    },
    onSuccess: (success) => {
      toast.success(success.message || "Content deleted successfully");
      // router.push("/dashboard/blog");
      queryClient.invalidateQueries({ queryKey: ["contentVideo"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete content");
    },
  });

  // Pagination logic
  // const totalPages = Math.ceil(imageData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return contentImage.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, contentImage]);

  return (
    <div className="h-screen px-10 pb-[87px]">
      <div className="w-full flex items-center justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#FF6900] py-[11.5px] px-6 rounded-md text-sm font-semibold font-poppins text-white"
        >
          Add Video <Plus size={16} />
        </button>
      </div>

      <div className="pt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-b border-black/20">
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Image
              </th>
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Section
              </th>
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                type
              </th>
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data: any) => (
              <tr key={data._id} className="bg-white border-b border-black/20">
                <td className="py-4 px-2 text-center">
                  <video width="80" height="60" controls>
                    <source src={data.url} type="video/mp4" />
                  </video>
                </td>
                <td className="text-sm font-poppins text-center">
                  {data.section}
                </td>
                <td className="text-sm font-poppins text-center">
                  {data.type}
                </td>
                <td className="text-sm font-poppins text-center">
                  <button onClick={()=>mutation.mutate(data._id)} className="">
                    <Trash2 size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-white rounded-b-[8px]">
          {imageData.length > itemsPerPage && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalResults={imageData.length}
                resultsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* add video modal form  */}
      {isOpen && (
        <AddUploadModal
          open={isOpen}
          onOpenChange={setIsOpen}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default VideoContainer;
