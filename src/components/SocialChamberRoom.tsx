"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
// import Image from "next/image";
import Masonry from "react-masonry-css";

// const images = [
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
//   "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://t4.ftcdn.net/jpg/10/93/45/23/360_F_1093452370_iSpkxn4xqCPjxnMJyRuguYhpqaQ8P0Yk.jpg",
//   "https://images.pexels.com/photos/31979192/pexels-photo-31979192/free-photo-of-fresh-asparagus-and-artichoke-with-ingredients-flat-lay.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   "https://images.pexels.com/photos/32195239/pexels-photo-32195239/free-photo-of-breakfast-table-with-bread-and-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   "https://images.pexels.com/photos/31837575/pexels-photo-31837575/free-photo-of-savannah-landscape-in-zaria-nigeria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfP1r1Ck7b16JdwZnxX-G6xP_bTOYHE3DcA&s",
// ];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function SocialChamberRoom() {
  const { data } = useQuery({
    queryKey: ["gellaryImage"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/assets?type=image&section=gallery`
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
  });
  const images = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-center">
      <h2 className="text-2xl font-bold text-orange-600 mb-8">
        The Social Chamber Room
      </h2>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-12"
        columnClassName="space-y-4"
      >
        {images.map((data: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-md shadow">
            <Image
              width={500}
              height={500}
              src={data.url}
              alt={`Room Image ${idx + 1}`}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        ))}
      </Masonry>

      <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition">
        Reserve Now →
      </button>
    </div>
  );
}
