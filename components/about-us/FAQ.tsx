import { generateKey } from "@/utils/key";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type FAQSectionProps = {};

const faq = [
  {
    id: "01",
    question: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    answer:
      "At EduAI Pro, we believe in a personalized and flexible approach to professional development, which is enhanced through the use of cutting-edge AI technology.",
  },
  {
    id: "02",
    question: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    answer:
      "At EduAI Pro, we believe in a personalized and flexible approach to professional development, which is enhanced through the use of cutting-edge AI technology.",
  },
  {
    id: "03",
    question: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    answer:
      "At EduAI Pro, we believe in a personalized and flexible approach to professional development, which is enhanced through the use of cutting-edge AI technology.",
  },
  {
    id: "04",
    question: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    answer:
      "At EduAI Pro, we believe in a personalized and flexible approach to professional development, which is enhanced through the use of cutting-edge AI technology.",
  },
  {
    id: "05",
    question: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    answer:
      "At EduAI Pro, we believe in a personalized and flexible approach to professional development, which is enhanced through the use of cutting-edge AI technology.",
  },
];

export const FAQSection = ({}: FAQSectionProps) => {
  return (
    <section className="bg-primary-100 py-10 md:py-20">
      <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[70%] mx-auto space-y-6 md:space-y-12">
        <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl text-center">
          Frequently Asked <br /> Questions
        </h2>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            // defaultValue="item-1"
          >
            {faq.map((f) => (
              <AccordionItem
                value={f.id}
                key={generateKey()}
                className="!border border-primary-150 rounded-lg px-4"
              >
                <AccordionTrigger className="text-primary font-medium">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{f.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
