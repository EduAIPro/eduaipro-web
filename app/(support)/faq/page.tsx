"use client";
import { faqs } from "@/components/common/data";
import Accordion from "@/components/common/lib/Accordion";
import Container from "@/components/common/ui/Container";
import GridBackground from "@/components/common/ui/GridBackground";
import Pill from "@/components/common/ui/Pill";
import Typography from "@/components/common/ui/Typography";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { generateKey } from "@/utils/key";
import { Link } from "@radix-ui/themes";
import { Arrow, ArrowRight, ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <section className="responsive_section bg-brand-600/50 rounded-3xl p-1 md:p-6 lg:p-12">
        <div className="py-8 md:py-10 lg:py-[57px] flex flex-col gap-y-4 relative px-5">
          <div className="w-fit">
            <Pill text="SUPPORT" variant="dark" />
          </div>
          <div className="lg:max-w-[70%]">
            <Typography.H1 size="xxlarge" weight="bold" fontColor="brand">
              Find answers to frequently asked questions and get the information
              you need.
            </Typography.H1>
          </div>
        </div>
      </section>

      <section className="responsive_section flex flex-col gap-y-12">
        <div className="grid md:grid-cols-2 gap-6 mt-12 md:px-6 lg:px-16">
          {faqs.map((faq, index) => (
            <Accordion
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              key={generateKey()}
            />
          ))}
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
            <Link href="mailto:hello@eduaipro.com">
              <span className="flex items-end gap-x-3 relative w-fit">
                <span>hello@eduaipro.com</span>
                <ArrowRight className="w-10 h-10" strokeWidth={5} />
                <span className="w-full h-1 bg-brand-900 absolute" />
              </span>
            </Link>
          </Typography.H1>
        </div>
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
