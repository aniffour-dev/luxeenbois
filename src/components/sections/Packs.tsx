"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { IoIosStar } from "react-icons/io";

// Type for Testimonial data
interface Testimonial {
  name: string;
  title: string;
  image: string;
  text: string;
}

// TestimonialCard Component for reusability
const TestimonialCard: React.FC<Testimonial> = ({
  name,
  title,
  image,
  text,
}) => {
  return (
    <div className="swiper-slide group bg-white border border-solid h-auto border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full hover:border-indigo-600 slide-active:border-indigo-600">
      <div className="flex items-center mb-9 gap-1 text-amber-500 transition-all duration-500 group-hover:text-indigo-600 swiper-slide-active:text-indigo-600">
        {[...Array(5)].map((_, index) => (
          <IoIosStar key={index} className="size-6" />
        ))}
      </div>
      <p className="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 mb-9 group-hover:text-gray-800">
        {text}
      </p>
      <div className="flex items-center gap-5">
        <img className="rounded-full object-cover h-14 w-14" src={image} alt="avatar" />
        <div className="grid gap-1 gap-y-0">
          <h5 className="text-gray-900 font-medium transition-all duration-500 group-hover:text-indigo-600 swiper-slide-active:text-indigo-600">
            {name}
          </h5>
          <span className="text-sm leading-6 text-gray-500">{title}</span>
        </div>
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Jane D",
      title: "CEO",
      image: "https://m.media-amazon.com/images/I/71MHa-FXZUL._SY250_.jpg",
      text: "Pagedone is simply the best tool of investment in the market right now.",
    },
    {
      name: "John S",
      title: "CTO",
      image: "https://m.media-amazon.com/images/I/71HZ1-ydh+L._SY250_.jpg",
      text: "Incredible service that helps us improve our workflow.",
    },
    {
      name: "Emma W",
      title: "Designer",
      image: "https://m.media-amazon.com/images/I/71lBEx2c4sL._SY250_.jpg",
      text: "I can't imagine working without this tool. It’s fantastic!",
    },
    {
      name: "James T",
      title: "Marketer",
      image: "https://m.media-amazon.com/images/I/711osJuax6L._SY250_.jpg",
      text: "A game-changer for our team’s productivity.",
    },
    {
      name: "Lily K",
      title: "Manager",
      image: "https://m.media-amazon.com/images/I/71YoXWwZugL._SY250_.jpg",
      text: "The easiest and most effective platform we've ever used.",
    },
    {
      name: "Alex P",
      title: "Founder",
      image: "https://m.media-amazon.com/images/I/61DFVlNmsgL._SY250_.jpg",
      text: "Absolutely love the design and features, keeps everything organized.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mb-16 px-6 lg:px-0">
      <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-5">
        Témoignages
      </h2>

      <Swiper
        pagination={true} // Enables pagination (dots)
        modules={[Pagination]} // Import the pagination module
        className="mySwiper"
        spaceBetween={30} // Space between slides
        breakpoints={{
          320: { slidesPerView: 1 }, // 1 slide per view on mobile
          768: { slidesPerView: 2 }, // 2 slides per view on tablet
          1024: { slidesPerView: 3 }, // 3 slides per view on desktop
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
