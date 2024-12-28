"use client";
import React, { useState } from "react";
import Image1 from "../../../public/hero.jpg";
import Image2 from "../../../public/galleries/1.jpg";
import Image3 from "../../../public/galleries/2.jpg";
import Image4 from "../../../public/galleries/3.jpg";
import Image5 from "../../../public/galleries/4.jpg";
import Image6 from "../../../public/galleries/5.jpg";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required Swiper modules
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { Bodoni_Moda } from "next/font/google";
import { useCart } from "@/contexts/CartContext";
import CheckoutForm from "../Checkout";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart({
      productName: "360° Rotation Porte-chaussures",
      color: selectedColor,
      quantity: quantity,
      price: 2000, // Price in MAD
    });
    setShowCheckoutForm(true);
  };

  const colors = [
    { name: "white", class: "bg-white border border-slate-300" },
    { name: "black", class: "bg-black border border-slate-300" },
  ];

  const images = [Image1, Image2, Image3, Image4, Image5, Image6];

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16 px-6 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Product Images */}
        <div className="space-y-4">
          <div className="main-swiper">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="object-cover"
                      fill
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="thumbnail-swiper">
            <Swiper
              // onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-lg cursor-pointer"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover"
                      fill
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">
              360° Rotation Porte-chaussures, Tient 35 Paires, Peu encombrant,
              Facile à Assembler, Durable, Design Élégant
            </h1>
          </div>

          <p className="text-gray-600">
            Tour de rangement à chaussures rotative originale, 7 niveaux pouvant
            contenir plus de 35 paires de chaussures, présentoir rotatif Lazy
            Susan, tour de rangement à chaussures tournante 360°, organisation
            de placard à chaussures rotatif.
          </p>

          <div className="flex items-baseline gap-4">
            <span
              className={`${bodoni.className} text-2xl font-bold text-emerald-600`}
            >
              2,000 MAD
            </span>
            <span className={`${bodoni.className} text-gray-500 line-through`}>
              2,500 MAD
            </span>
            <span className="text-red-500">20% de réduction</span>
          </div>

          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-500 ml-2">1624 avis</span>
          </div>

          <div>
            <h3 className="font-medium mb-3">Couleur</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-10 h-10 rounded-full ${color.class} ${
                    selectedColor === color.name
                      ? "ring-2 ring-offset-2 ring-gray-800"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center border rounded">
              <button
                className="p-3 hover:bg-gray-100"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="p-3 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="gap-4 w-full">
              <button
                onClick={handleBuyNow}
                className="w-full py-3 rounded bg-black font-semibold text-white hover:bg-indigo-700 flex-1"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
        <CheckoutForm
          isOpen={showCheckoutForm}
          onClose={() => setShowCheckoutForm(false)}
        />
      </div>
    </div>
  );
};

export default ProductPage;
