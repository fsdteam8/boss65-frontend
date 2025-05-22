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
import { BookingPagination } from "../../booking/_components/booking-pagination";
import CreateModal from "./CreateModal";
import SendModal from "./SendModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useSession } from "next-auth/react";

const PromoPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI4MGYxMmI4OTQ1OGY4MGRiNzRjNzUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzgwMTcyMCwiZXhwIjoxNzQ4NDA2NTIwfQ.XM3apv4H6GvIyKZ8W66nIMBWe5osk62Jn3FzpXxzZ4I";
// const token = localStorage.getItem("token");
const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  console.log("token", token);
  const queryClient = useQueryClient();

  const {
    data: promoCodes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["promoCodes"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo-codes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch promo codes");
      }

      return res.json();
    },
    enabled: !!token,
  });

  const promoData = promoCodes?.data?.data || [];
  console.log("promoData", promoData);

  const deletePromoCodeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo-codes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete promo code");
      }

      return res.json();
    },
    onMutate: () => {
      toast.loading("Deleting promo code...", { id: "deleteToast" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promoCodes"] });
      toast.success("Promo code deleted successfully", { id: "deleteToast" });
    },
    onError: (error) => {
      toast.error("Failed to delete promo code", { id: "deleteToast" });
      console.error("Delete failed:", error);
    },
  });

  const totalItems = promoData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItemStart = (currentPage - 1) * itemsPerPage + 1;
  const currentItemEnd = Math.min(currentPage * itemsPerPage, totalItems);
  const currentPromoCodes = promoData.slice(
    currentItemStart - 1,
    currentItemEnd
  );

  const handleSendCode = (id: string, code: string) => {
    console.log("Promo code ID clicked:", id);
    setSelectedCode(code);
    setIsSendModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deletePromoCodeMutation.mutate(deleteId);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <div className="flex justify-between items-center p-6 mb-[60px]">
        <h1 className="text-2xl font-semibold">Promo Codes</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#FF6B00] hover:bg-[#e05f00] text-white"
        >
          Create Promo Code <span className="ml-1">+</span>
        </Button>
      </div>

      <div className="w-[96%] mx-auto bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-20 py-4 text-base text-black">ID</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Code</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Discount</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Expiration</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Usage</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Status</TableHead>
              <TableHead className="px-20 py-4 text-base text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Loading promo codes...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-red-500 py-6">
                  Failed to load promo codes. Please try again.
                </TableCell>
              </TableRow>
            ) : currentPromoCodes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No promo codes found.
                </TableCell>
              </TableRow>
            ) : (
              currentPromoCodes.map((code: any, index: number) => (
                <TableRow key={code._id}>
                  <TableCell className="px-20 py-6 text-sm text-black">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-20 py-6 text-sm text-black">
                    {code.code.slice(0, 10)}...
                  </TableCell>
                  <TableCell className="px-20 py-6 text-sm text-black">
                    {code.discountValue}% off
                  </TableCell>
                  <TableCell className="px-20 py-6 text-sm text-black">
                    {new Date(code.expiryDate).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell className="px-20 py-6 text-sm text-black">
                    {code.usedCount}/{code.usageLimit}
                  </TableCell>
                  <TableCell className="px-[75px]">
                    <Badge
                      className={
                        code.active
                          ? "bg-[#E6EFE6] text-[#016102] hover:bg-[#d5e6d5]"
                          : "bg-[#FFEBEB] text-[#FF0000] hover:bg-[#ffd9d9]"
                      }
                    >
                      {code.active ? "Active" : "Expired"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex px-[63px] space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSendCode(code._id, code.code)}
                      >
                        <Mail className="h-5 w-5 text-black" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(code._id)}
                      >
                        <Trash className="h-5 w-5 text-black" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

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

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {isCreateModalOpen && (
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isSendModalOpen && selectedCode && (
        <SendModal
          isOpen={isSendModalOpen}
          onClose={() => setIsSendModalOpen(false)}
          promoCode={selectedCode}
        />
      )}
    </div>
  );
};

export default PromoPage;

