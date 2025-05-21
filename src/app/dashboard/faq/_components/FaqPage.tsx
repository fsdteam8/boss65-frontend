"use client";

import { useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingPagination } from "../../booking/_components/booking-pagination";
import AddFaqModal from "./Add-faq-modal";
import EditFaqModal from "./Edit-modal";
import { useQuery } from "@tanstack/react-query";

interface FAQ {
  id: string;
  title: string;
  description: string;
}

const FaqPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI4MGYxMmI4OTQ1OGY4MGRiNzRjNzUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzgwMTcyMCwiZXhwIjoxNzQ4NDA2NTIwfQ.XM3apv4H6GvIyKZ8W66nIMBWe5osk62Jn3FzpXxzZ4I";

  const {
    data: faqData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/faqs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch FAQs");
      }

      return res.json();
    },
    enabled: !!token,
  });

  const faqAllData = faqData?.data || [];


  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ["faqs"] });

  const totalItems = faqAllData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItemStart = (currentPage - 1) * itemsPerPage + 1;
  const currentItemEnd = Math.min(currentPage * itemsPerPage, totalItems);
  const currentFaqs = faqAllData.slice(currentItemStart - 1, currentItemEnd);

  const handleEditFaq = (faq: any) => {
    setSelectedFaq({
      id: faq._id,
      title: faq.question,
      description: faq.answer,
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-6">Loading FAQs...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load FAQs.</div>;
  }

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <div className="flex justify-between items-center p-6 mb-[70px]">
        <h1 className="text-2xl font-semibold px-3">Content Management</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#FF6B00] hover:bg-[#e05f00] text-white"
        >
          Add FAQ <span className="ml-1">+</span>
        </Button>
      </div>

      <div className="w-[96%] mx-auto bg-[#FFFFFF] rounded-lg">
        <Table className="rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="px-20 py-4 text-base text-black">ID</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Title</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Description</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFaqs.map((faq: any, index: number) => (
              <TableRow key={faq._id}>
                <TableCell className="px-20 py-3 text-base text-black">{index + 1}</TableCell>
                <TableCell className="px-20 py-3 text-base text-black">{faq.question}</TableCell>
                <TableCell className="px-20 py-3 text-base text-black">{faq.answer}</TableCell>
                <TableCell className="px-20 py-3">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditFaq(faq)}
                    >
                      <SquarePen className="h-6 w-6 text-black" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-6 w-6 text-black" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="bg-[#FFFFFF] rounded-lg">
          <BookingPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            currentItemStart={currentItemStart}
            currentItemEnd={currentItemEnd}
          />
        </div>
      </div>

      {isAddModalOpen && (
        <AddFaqModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {isEditModalOpen && selectedFaq && (
        <EditFaqModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          faq={selectedFaq}
        />
      )}
    </div>
  );
};

export default FaqPage;
