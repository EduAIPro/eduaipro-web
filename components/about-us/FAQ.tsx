"use client";
import { generateKey } from "@/utils/key";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

const faq = [
  {
    question: "What is EduAI Pro?",
    answer:
      "EduAI Pro is an accredited, AI-powered Continuing Professional Development (CPD) platform designed specifically for educators, mentors, and teaching assistants in primary, secondary, and higher education. The platform provides personalized learning experiences, collaborative community forums, and recognized certifications.",
  },
  {
    question: "Who can benefit from EduAI Pro?",
    answer:
      "EduAI Pro caters primarily to educational professionals such as teachers, mentors, teaching assistants, and school administrators seeking to enhance their skills, maintain professional certification, or advance their careers.",
  },
  {
    question: "How do I create an EduAI Pro account?",
    answer:
      "You can create an account directly from the login page by providing your email address, choosing a secure password, and filling in your professional details to customize your learning experience.",
  },
  {
    question: "What if I forget my password?",
    answer:
      'Use the "Forgot Password" link on the login page. Follow the instructions sent to your registered email address to reset your password.',
  },
  {
    question: "What types of CPD courses does EduAI Pro offer?",
    answer:
      "EduAI Pro offers tailored CPD courses for primary, secondary, and higher education educators, covering areas like pedagogy, inclusive education, lesson differentiation, curriculum design, and technology integration.",
  },
];

export const FAQSection = () => {
  const router = useRouter();
  return (
    <section className="bg-primary-100 py-10 md:py-20">
      <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[70%] mx-auto space-y-6 md:space-y-12">
        <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl text-center">
          Frequently Asked <br /> Questions
        </h2>
        <div className="space-y-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faq.map((item) => (
              <AccordionItem
                value={item.question}
                key={generateKey()}
                className="!border border-primary-150 rounded-lg px-4"
              >
                <AccordionTrigger className="text-primary font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-base">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="w-fit mx-auto">
            <Button onClick={() => router.push("/faq")}>
              <p>View all</p>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
