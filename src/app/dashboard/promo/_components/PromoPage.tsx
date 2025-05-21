"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Trash } from "lucide-react";
import CreatePromoCodeModal from "./CreateModal";
import SendPromoCodeModal from "./SendModal";
import { BookingPagination } from "../../booking/_components/booking-pagination";

const PromoPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const promoCodes = [
    {
      id: "1",
      code: "SUMMER20",
      discount: "20% Off",
      expiration: "2025-12-31",
      usage: "10/50",
      status: "active",
    },
    {
      id: "2",
      code: "WINTER10",
      discount: "10% Off",
      expiration: "2024-11-15",
      usage: "25/30",
      status: "expired",
    },
    {
      id: "3",
      code: "FALL15",
      discount: "15% Off",
      expiration: "2025-09-01",
      usage: "3/40",
      status: "active",
    },
  ];

  const totalItems = promoCodes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItemStart = (currentPage - 1) * itemsPerPage + 1;
  const currentItemEnd = Math.min(currentPage * itemsPerPage, totalItems);
  const currentPromoCodes = promoCodes.slice(
    currentItemStart - 1,
    currentItemEnd
  );

  const handleSendCode = (code: string) => {
    setSelectedCode(code);
    setIsSendModalOpen(true);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Promo Codes</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#FF6B00] hover:bg-[#e05f00] text-white"
        >
          Create Promo Code <span className="ml-1">+</span>
        </Button>
      </div>

      <div className="w-[96%] mx-auto bg-[#FFFFFF] rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-20 py-4 text-base text-black">
                Code
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Discount
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Expiration
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Usage
              </TableHead>
              <TableHead className="px-20 py-4 text-base text-black">
                Status
              </TableHead>
              <TableHead className="px-20 py-3 text-base text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPromoCodes.map((code) => (
              <TableRow key={code.id}>
                <TableCell className="px-20 py-6 text-[14px] text-black">
                  {code.code}
                </TableCell>
                <TableCell className="px-20 py-6 text-[14px] text-black">
                  {code.discount}
                </TableCell>
                <TableCell className="px-20 py-6 text-[14px] text-black">
                  {code.expiration}
                </TableCell>
                <TableCell className="px-20 py-6 text-[14px] text-black">
                  {code.usage}
                </TableCell>
                <TableCell className="px-[75px]">
                  <Badge
                    className={
                      code.status === "active"
                        ? "bg-[#E6EFE6] text-[#016102] hover:bg-[#d5e6d5]"
                        : "bg-[#FFEBEB] text-[#FF0000] hover:bg-[#ffd9d9]"
                    }
                  >
                    {code.status === "active" ? "Active" : "Expired"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex px-[63px]">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSendCode(code.code)}
                    >
                      <Mail className="h-6 w-6 text-black" />
                    </Button>
                    {/* <Button variant="ghost" size="icon">
                      <Pencil className="h-6 w-6 text-gray-600" />
                    </Button> */}
                    <Button variant="ghost" size="icon">
                      <Trash className="h-6 w-6 text-black" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="">
          <BookingPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentItemStart={currentItemStart}
            currentItemEnd={currentItemEnd}
          />
        </div>
      </div>

      {isCreateModalOpen && (
        <CreatePromoCodeModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isSendModalOpen && selectedCode && (
        <SendPromoCodeModal
          isOpen={isSendModalOpen}
          onClose={() => setIsSendModalOpen(false)}
          promoCode={selectedCode}
        />
      )}
    </div>
  );
};

export default PromoPage;
