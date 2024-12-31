"use client";
import React, { useState } from "react";
import Image1 from "../../../public/hero.jpg";
import Image2 from "../../../public/galleries/1.jpg";
import Image3 from "../../../public/galleries/2.jpg";
import Image4 from "../../../public/galleries/3.jpg";
import Image5 from "../../../public/galleries/4.jpg";
import Image6 from "../../../public/galleries/5.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { Bodoni_Moda } from "next/font/google";
import * as yup from "yup";
import { ValidationError } from "yup";
import { Toaster, toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const checkoutSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/,
      "Please enter a valid phone number. Format: +1-234-567-8900 or 2345678900"
    ),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
});

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validateField = async (name: keyof FormData, value: string) => {
    try {
      const fieldSchema = yup.reach(checkoutSchema, name) as yup.Schema<string>;
      await fieldSchema.validate(value);
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await checkoutSchema.validate(formData, { abortEarly: false });

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: formData,
          orderItems: [
            {
              productName: "360° Rotation Porte-chaussures",
              color: selectedColor,
              quantity,
              price: 2000,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to place order!");
      }

      toast.success("L’achat a été couronné de succès!");
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Partial<Record<keyof FormData, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof FormData] = err.message;
          }
        });
        setFormErrors(validationErrors);
      } else {
        console.error("Checkout error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while placing your order"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = [
    { name: "white", class: "bg-white border border-slate-300" },
    { name: "black", class: "bg-black border border-slate-300" },
  ];

  const images = [Image1, Image2, Image3, Image4, Image5, Image6];

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16 px-6 lg:px-0">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative lg:sticky lg:top-20 lg:self-start">
          <div className="main-swiper">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="rounded-lg shadow-lg"
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

          <div className="thumbnail-swiper mt-4">
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-lg cursor-pointer shadow-lg"
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

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">
              360° Rotation Porte-chaussures, Tient 35 Paires, Peu encombrant,
              Facile à Assembler, Durable, Design Élégant
            </h1>
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

          <p className="text-gray-600">
            Tour de rangement à chaussures rotative originale, 7 niveaux pouvant
            contenir plus de 35 paires de chaussures, présentoir rotatif Lazy
            Susan, tour de rangement à chaussures tournante 360°, organisation
            de placard à chaussures rotatif.
          </p>

          <div className="flex items-baseline gap-4">
            <span
              className={`${bodoni.className} text-3xl font-bold text-emerald-600`}
            >
              2,000 MAD
            </span>
            <span
              className={`${bodoni.className} text-gray-500 line-through text-lg`}
            >
              2,500 MAD
            </span>
            <span className="text-red-500 text-lg font-semibold">
              20% de réduction
            </span>
          </div>

          <div className="flex justify-start items-center gap-8">
            <div className="flex justify-start items-center gap-2">
              <h3 className="font-medium text-gray-800">Couleur:</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-7 h-7 rounded-full ${color.class} ${
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
              <div className="flex items-center border rounded shadow-sm">
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
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-md text-black font-semibold mb-3">
              Pour acheter ces articles, veuillez remplir ce formulaire
              ci-dessous !
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                  Nom et prénom:
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                Téléphone:
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                Adresse de livraison:
              </label>
              <textarea
                name="address"
                required
                className="shadow appearance-none border h-20 max-h-20 min-h-20 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                disabled={isSubmitting}
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.address}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className={`w-full py-3 uppercase font-semibold rounded bg-violet-900 text-violet-50 flex-1 flex items-center justify-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin h-5 w-5 text-white mr-3" />
                ) : null}
                {isSubmitting ? "Acheter maintenant..." : "Acheter maintenant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
