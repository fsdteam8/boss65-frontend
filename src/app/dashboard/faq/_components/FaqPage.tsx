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
  const itemsPerPage = 3; // Change as needed

  const faqs: FAQ[] = [
    {
      id: "1",
      title: "What services do you offer?",
      description: "We offer a wide range of moving services across suburbs...",
    },
    {
      id: "2",
      title: "How do I book a service?",
      description: "You can book via our website or by calling our hotline...",
    },
    {
      id: "3",
      title: "What payment methods are accepted?",
      description:
        "We accept credit/debit cards, PayPal, and cash on delivery...",
    },
    {
      id: "4",
      title: "Do you provide packing materials?",
      description:
        "Yes, we provide all necessary packing materials on request...",
    },
  ];

  const totalItems = faqs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItemStart = (currentPage - 1) * itemsPerPage + 1;
  const currentItemEnd = Math.min(currentPage * itemsPerPage, totalItems);
  const currentFaqs = faqs.slice(currentItemStart - 1, currentItemEnd);

  const handleEditFaq = (faq: FAQ) => {
    setSelectedFaq(faq);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Content Management</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#FF6B00] hover:bg-[#e05f00] text-white"
        >
          Add FAQ <span className="ml-1">+</span>
        </Button>
      </div>

      <div className="w-[96%] mx-auto bg-[#FFFFFF] rounded-lg">
        <Table className="rounded-xl">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="px-20 py-4 text-base text-black">
                ID
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Title
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Description
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFaqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="px-20 py-3 text-base text-black">
                  {faq.id}
                </TableCell>
                <TableCell className="px-20 py-3 text-base text-black">
                  {faq.title}
                </TableCell>
                <TableCell className="px-20 py-3 text-base text-black">
                  {faq.description}
                </TableCell>
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

        <div className="p-4 bg-[#FFFFFF] rounded-lg">
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
