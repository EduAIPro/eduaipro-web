import { generateKey } from "@/utils/key";
import Pill from "../common/ui/Pill";
import { Button } from "../ui/button";

const approaches = [
  {
    title: "Needs Assessment & Consultation",
    description:
      "We begin with a collaborative consultation to understand your school's vision, challenges, and growth goals. This includes curriculum alignment, classroom needs, and faculty development priorities.",
  },
  {
    title: "Tailored Course Design",
    description:
      "Our team works with you to co-develop a custom CPD course plan — from digital tools and pedagogy to inclusive teaching strategies.",
  },
  {
    title: "Progress Tracking & Feedback Loop",
    description:
      "Monitor teacher engagement in real-time. We collect and respond to ongoing feedback to keep your program relevant and impactful.",
  },
  {
    title: "Certification & Continued Support",
    description:
      "Teachers earn accredited CPD certificates. We continuesupporting your school with follow-ups, coaching, and refresher modules.",
  },
];

export const FourStepApproach = () => {
  return (
    <section className="py-10 md:py-20 max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
      <div className="space-y-8 md:space-y-16">
        <div className="space-y-2.5 text-center">
          <Pill
            text="Our Process – Step-by-Step Partnership"
            pillBg="#F1F5FF"
          />
          <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl">
            Our 4-Step Approach to Personalized CPD Design
          </h2>
        </div>
        <div className="space-y-10">
          <ul className="grid sm:grid-cols-2 gap-10">
            {approaches.map((a, i) => (
              <li key={generateKey()} className="font-medium">
                <p>Step {i + 1}</p>
                <h3 className="text-lg text-primary">{a.title}</h3>
                <p>{a.description}</p>
              </li>
            ))}
          </ul>
          <div className="w-fit mx-auto">
            <Button>
              <p>Schedule a consultation</p>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
