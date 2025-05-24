"use client";

import type React from "react";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Play, Eye, Loader2 } from "lucide-react";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function VideoPlayer({ data,  }: { data: any; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, ] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !error) {
            video.play().catch(() => {
              setError(true);
            });
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [error]);

  // const toggleMute = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (videoRef.current) {
  //     videoRef.current.muted = !videoRef.current.muted;
  //     setIsMuted(videoRef.current.muted);
  //   }
  // };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && !error) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {
          setError(true);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {error ? (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200">
          <div className="text-center text-gray-500">
            <Play className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Video unavailable</p>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-auto object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          crossOrigin="anonymous"
        >
          <source src={data.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Loading Spinner */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      {/* Video Controls */}
      {!error && (
        <div className="absolute top-3 right-3 flex gap-2">
          {/* <div className="bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            VIDEO
          </div> */}
          {/* <button
            onClick={toggleMute}
            className="bg-black/80 text-white p-1.5 rounded hover:bg-black/90 transition-colors backdrop-blur-sm"
          > */}
          {/* {isMuted ? (
              <VolumeX className="w-3 h-3" />
            ) : (
              <Volume2 className="w-3 h-3" />
            )} */}
          {/* </button> */}
        </div>
      )}

      {/* Play/Pause Overlay */}
      {!error && (
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
          onClick={togglePlay}
        >
          {!isPlaying && (
            <Play
              className="w-12 h-12 text-white drop-shadow-lg"
              fill="white"
            />
          )}
        </div>
      )}

      {/* Hover overlay with stats */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          {/* <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {(Math.random() * 10 + 1).toFixed(1)}k
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {Math.floor(Math.random() * 500 + 50)}
                </div>
              </div>
              <p className="text-xs opacity-80 truncate">
                {data.public_id ? data.public_id.split("/").pop() : `Video ${index + 1}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-white hover:bg-white/20 p-1.5 rounded transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="text-white hover:bg-white/20 p-1.5 rounded transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function ImageItem({ data, index }: { data: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {error ? (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200">
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded" />
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      ) : (
        <Image
          width={500}
          height={500}
          src={data.url || "/placeholder.svg"}
          alt={`Room Image ${index + 1}`}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Loading Spinner */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      )}

      {/* Image Badge */}
      {!error && (
        <div className="absolute top-3 right-3">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"></div>
        </div>
      )}

      {/* Hover overlay with stats */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          {/* <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {(Math.random() * 10 + 1).toFixed(1)}k
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {Math.floor(Math.random() * 500 + 50)}
                </div>
              </div>
              <p className="text-xs opacity-80 truncate">
                {data.public_id ? data.public_id.split("/").pop() : `Image ${index + 1}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-white hover:bg-white/20 p-1.5 rounded transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="text-white hover:bg-white/20 p-1.5 rounded transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default function SocialChamberRoom() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["gellaryImage"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/assets?type=image&type=video&section=gallery`
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
  });

  const images = data?.data || [];

  // Get statistics from your actual data
  const getStats = () => {
    const totalItems = images.length;
    const videoCount = images.filter(
      (item: any) => item.type === "video"
    ).length;
    const imageCount = images.filter(
      (item: any) => item.type === "image"
    ).length;
    return { totalItems, videoCount, imageCount };
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-orange-600 mb-8">
          The Social Chamber Room
        </h2>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading gallery...</p>
            <p className="text-sm text-gray-400 mt-2">
              Fetching media from server
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-orange-600 mb-8">
          The Social Chamber Room
        </h2>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading gallery</p>
            <button
              onClick={() => refetch()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-center">
      {/* Header with stats */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-orange-600 mb-4">
          The Social Chamber Room
        </h2>
        <div className="flex items-center justify-center gap-4 text-sm md:text-base text-gray-600">
          <span>{stats.totalItems} items</span>
          <span>•</span>
          <span>{stats.videoCount} videos</span>
          <span>•</span>
          <span>{stats.imageCount} images</span>
        </div>
      </div>

      {/* Gallery */}
      {images.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4 md:gap-6"
          columnClassName="space-y-4 md:space-y-6"
        >
          {images.map((data: any, idx: number) =>
            data.type === "video" ? (
              <VideoPlayer key={data._id || idx} data={data} index={idx} />
            ) : (
              <ImageItem key={data._id || idx} data={data} index={idx} />
            )
          )}
        </Masonry>
      ) : (
        <div className="py-20">
          <div className="text-gray-400 mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <Eye className="w-8 h-8" />
            </div>
          </div>
          <p className="text-gray-500 text-lg mb-2">No gallery items found</p>
          <p className="text-gray-400 text-sm mb-4">
            Check your API connection or add some media items
          </p>
          <button
            onClick={() => refetch()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Reload Gallery
          </button>
        </div>
      )}

      {/* Call to Action */}
      <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
        Reserve Now →
      </button>
    </div>
  );
}
