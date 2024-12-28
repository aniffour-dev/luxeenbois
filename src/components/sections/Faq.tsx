"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import FaqImg from "../../../public/galleries/1.jpg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How to create an account?",
    answer:
      "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform.",
  },
  {
    question: "Have any trust issue?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
  {
    question: "What is the payment process?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
  {
    question: "What is the payment process?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
  {
    question: "What is the payment process?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-x-8 gap-y-5 xl:gap-16 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <Image
              src={FaqImg}
              alt="FAQ tailwind section"
              height={600}
              width={600}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6">
                <h2 className="text-2xl text-center font-bold text-gray-900 leading-[3.25rem] mb-2 lg:text-left">
                  Questions et réponses des clients
                </h2>
              </div>
              <div
                className="accordion-group"
                data-accordion="default-accordion"
              >
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`accordion ${
                      index < faqs.length - 1
                        ? "py-4 border-b border-solid border-gray-200"
                        : ""
                    }`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h5 className="text-black text-lg font-semibold">
                        {faq.question}
                      </h5>
                      {activeIndex === index ? (
                        <FaChevronUp className="text-indigo-600" />
                      ) : (
                        <FaChevronDown className="text-gray-900 group-hover:text-indigo-600" />
                      )}
                    </button>
                    <div
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 transition-max-height duration-500 ${
                        activeIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="text-base font-normal text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
