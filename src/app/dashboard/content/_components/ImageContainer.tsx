/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { PencilIcon, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { AddImageModal } from "./add-image-modal";
import { Pagination } from "@/components/ui/pagination";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import Link from "next/link";
import { EditeImageModal } from "./edite-content-image";

const ImageContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, editonOpenChange] = useState(false);
  const [id, setId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const itemsPerPage = 5;


  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data } = useQuery({
    queryKey: ["contentImage"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/assets?type=image`,
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
      queryClient.invalidateQueries({ queryKey: ["contentImage"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete content");
    },
  });

  const contentImage = data?.data || [];

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
          Add Image <Plus size={16} />
        </button>
      </div>

      <div className="pt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-b border-black/20">
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Image
              </th>
              {/* <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Title
              </th> */}
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Section
              </th>
              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Type
              </th>

              <th className="text-base font-poppins font-normal text-black text-center py-5 px-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((data: any) => (
              <tr key={data._id} className="bg-white border-b border-black/20">
                <td className="py-4 px-2 text-center">
                  <Image
                    src={
                      data.url ||
                      "https://res.cloudinary.com/dcrx1tky7/image/upload/v1747803172/blogs/thumbnails/blog_thumb_1747803168687.png"
                    }
                    alt="section image"
                    width={80}
                    height={60}
                    className="mx-auto rounded"
                  />
                </td>
                {/* <td className="text-sm font-poppins text-center">
                  {data.title}
                </td> */}
                <td className="text-sm font-poppins text-center">
                  {data.section}
                </td>
                <td className="text-sm font-poppins text-center">
                  {data.type}
                </td>
                <td className="text-sm font-poppins text-center space-x-3">
                  <button className="" onClick={() => setId(data._id)}>
                    <PencilIcon size={24} />
                  </button>
                  <button className="">
                    <Trash2
                      onClick={() => mutation.mutate(data._id)}
                      size={24}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-white rounded-b-[8px]">
          {contentImage.length > itemsPerPage && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalResults={contentImage.length}
                resultsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* add image modal form  */}
      {isOpen && (
        <AddImageModal
          open={isOpen}
          onOpenChange={setIsOpen}
          onSave={(data) => console.log(data)}
        />
      )}
      {/* add image modal form  */}
      {editOpen && (
        <EditeImageModal
          editOpen={editOpen}
          editonOpenChange={editonOpenChange}
          id={id}
        />
      )}
    </div>
  );
};

export default ImageContainer;
