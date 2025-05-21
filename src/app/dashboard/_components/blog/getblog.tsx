import Image from "next/image";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  SquarePen,
} from "lucide-react";
import Link from "next/link";

export default function GetBlog() {
  return (
    <div className="">
      <div className="p-[40px]">
        <div className="flex justify-between items-center mb-[80px]">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <Link href={"/dashboard/blog/add"}>
            <button className="bg-[#FF6900] hover:bg-orange-600 text-white px-4 py-2 rounded-md flex  items-center">
              Add Blog <Plus className="ml-1 h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="bg-[#FFFFFF] rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-12  px-[16px] border-b border-gray-200 bg-white">
            <div className="col-span-6 font-medium py-[20px] text-[16px]">
              Blog Name
            </div>
            <div className="col-span-3 font-medium py-[20px] text-[16px]">
              Added
            </div>
            <div className="col-span-3 font-medium py-[20px] text-right text-[16px]">
              Action
            </div>
          </div>

          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-12 py-4 px-6 border-b border-gray-100 items-center"
            >
              <div className="col-span-6 flex items-center">
                <div className="relative h-12 w-16 mr-3 overflow-hidden rounded">
                  <Image
                    src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"
                    alt="Blog thumbnail"
                    width={64}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="truncate">
                  Lorem ipsum dolor sit amet, conse...
                </span>
              </div>
              <div className="col-span-3 text-gray-600">10/05/2025 03:18pm</div>
              <div className="col-span-3 flex justify-end space-x-2">
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <SquarePen className="h-5 w-5 text-gray-700" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between py-4 px-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">7</span> to{" "}
              <span className="font-medium">7</span> of{" "}
              <span className="font-medium">##</span> results
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
