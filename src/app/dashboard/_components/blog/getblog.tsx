"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  SquarePen,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
interface Blog {
  _id?: string;
  title?: string;
  thumbnail?: string;
  createdAt?: string;
}
export default function GetBlog() {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/blogs`,
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
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit blog");
      }

      return res.json();
    },
    onSuccess: (success) => {
      toast.success(success.message || "Blog published successfully");
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to publish blog");
    },
  });

  const blogs = data?.data || [];

  return (
    <div>
      <div className="p-[40px]">
        <div className="flex justify-between items-center mb-[80px]">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <Link href="/dashboard/blog/add">
            <button className="bg-[#FF6900] hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center">
              Add Blog <Plus className="ml-1 h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-12 px-4 border-b border-gray-200">
            <div className="col-span-6 font-medium py-5 text-[16px]">
              Blog Name
            </div>
            <div className="col-span-3 font-medium py-5 text-[16px]">Added</div>
            <div className="col-span-3 font-medium py-5 text-right text-[16px]">
              Action
            </div>
          </div>
          {blogs.map((blog: Blog, index: number) => (
            <div
              key={blog._id || index}
              className="grid grid-cols-12 py-4 px-6 border-b border-gray-100 items-center"
            >
              <div className="col-span-6 flex items-center">
                <div className="relative h-12 w-16 mr-3 overflow-hidden rounded bg-gray-100">
                  {blog.thumbnail ? (
                    <Image
                      src={blog.thumbnail}
                      alt="Blog thumbnail"
                      width={64}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <span className="truncate">{blog.title || "Untitled"}</span>
              </div>
              <div className="col-span-3 text-gray-600">
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleString()
                  : ""}
              </div>
              <div className="col-span-3 flex justify-end space-x-2">
                <Link href={`/dashboard/blog/${blog._id}`}>
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <SquarePen className="h-5 w-5 text-gray-700" />
                  </button>
                </Link>
                <button
                  onClick={() => {
                    if (blog._id) {
                      mutation.mutate(blog._id);
                    }
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded"
                  disabled={!blog._id}
                >
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between py-4 px-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{blogs.length}</span> to{" "}
              <span className="font-medium">{blogs.length}</span> of{" "}
              <span className="font-medium">{blogs.length}</span> results
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-2 rounded hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <Link
                href="#"
                className="px-3 py-1 rounded hover:bg-gray-100 bg-white"
              >
                1
              </Link>
              <Link
                href="#"
                className="px-3 py-1 rounded bg-gray-100 text-gray-700"
              >
                2
              </Link>
              <Link
                href="#"
                className="px-3 py-1 rounded hover:bg-gray-100 bg-white"
              >
                3
              </Link>
              <button className="p-2 rounded hover:bg-gray-100">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
