"use client";
import faq from "@/components/common/data/faq.json";
import Pill from "@/components/common/ui/Pill";
import Typography from "@/components/common/ui/Typography";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateKey } from "@/utils/key";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <section className="pt-32 md:pt-40 bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] animate-fade-in-up">
        <div className="flex flex-col gap-y-4 relative max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
          <div className="w-fit">
            <Pill text="Support" pillBg="#F1F5FF" />
          </div>
          <div className="lg:max-w-[70%]">
            <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
              Find answers to frequently asked questions and get the information
              you need.
            </h1>
          </div>
        </div>
      </section>

      <section className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto flex flex-col gap-y-12 py-12 md:py-20">
        <div className="">
          <ul className="space-y-8">
            {faq.map((f) => (
              <li className="flex justify-between w-full gap-5 max-md:flex-col">
                <div className="w-fit md:w-1/3 xl:w-1/2">
                  <h3 className="text-base md:text-lg lg:text-xl font-medium">
                    {f.title}
                  </h3>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-3 md:w-2/3 xl:w-1/2"
                >
                  {f.contents.map((fc, i) => (
                    <AccordionItem
                      value={fc.question.split(" ")[0]}
                      key={generateKey()}
                      className="!border border-primary-150 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-primary font-medium text-left">
                        {fc.question}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-base">
                        <p>{fc.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-4 sm:max-w-[80%] md:mt-12">
          <Typography.P
            weight="black"
            size="large"
            className="uppercase !text-grey-12/80"
          >
            still have questions?
          </Typography.P>
          <Typography.H1 fontColor="brand">
            {" "}
            <strong>Still have a question?</strong> if you have questions or
            need assistance, please do not hesitate and contact us by email:{" "}
            <br />{" "}
            <a href="mailto:support@eduaipro.ng" target="_blank">
              <span className="flex items-end gap-x-3 relative w-fit">
                <span>support@eduaipro.ng</span>
                <ArrowRight className="w-10 h-10" strokeWidth={5} />
                <span className="w-full h-1 bg-brand-900 absolute" />
              </span>
            </a>
          </Typography.H1>
        </div>
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
