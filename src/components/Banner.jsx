"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function Banner() {
  // মাউন্টেড স্টেট তৈরি করা হলো
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const bannerData = [
    {
      id: 1,
      title: "Discover Your Next Great Read",
      description: "Explore thousands of books across multiple genres. Borrow and read at your own pace.",
      btnText: "Browse Books",
      bgClass: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600",
    },
    {
      id: 2,
      title: "Share Your Favorite Books",
      description: "Add books to our library and help build a community of passionate readers.",
      btnText: "Join Community",
      bgClass: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600",
    },
    {
      id: 3,
      title: "Build Your Digital Library",
      description: "Keep track of your reading journey with our smart inventory and borrowing system.",
      btnText: "Get Started",
      bgClass: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600",
    }
  ];

  // ব্রাউজারে লোড হওয়ার আগে একটি সুন্দর প্লেসহোল্ডার দেখাবে, এরর খাবে না
  if (!isMounted) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-0 relative">
        <div className="w-full h-[350px] md:h-[450px] rounded-[2rem] bg-base-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-0 relative">
      <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Autoplay, Pagination]}
          className="w-full h-[350px] md:h-[450px]"
        >
          {bannerData.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className={`w-full h-full flex flex-col items-center justify-center text-center px-6 md:px-20 ${banner.bgClass}`}>
                <div className="max-w-3xl space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm max-w-2xl mx-auto">
                    {banner.description}
                  </p>
                  <div className="pt-4">
                    <Link href="/books" className="btn bg-white text-primary border-none hover:bg-gray-100 hover:scale-105 transition-transform duration-300 rounded-xl px-8 py-3 h-auto text-lg font-bold shadow-xl">
                      {banner.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}