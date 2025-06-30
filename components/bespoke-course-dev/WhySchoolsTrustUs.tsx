import GlobeGraduate from "@/components/svgs/globe-graduate.svg";
import NoteCardIcon from "@/components/svgs/note-card.svg";
import ScalableIcon from "@/components/svgs/scalable.svg";
import ScaleIcon from "@/components/svgs/scale.svg";
import TalentIcon from "@/components/svgs/talent.svg";
import Target from "@/components/svgs/target.svg";
import TrendIcon from "@/components/svgs/trend.svg";
import { generateKey } from "@/utils/key";
import Pill from "../common/ui/Pill";

const reasons = [
  {
    icon: ScalableIcon,
    title: "Scalable Across School Sizes",
    description:
      "Whether you support 10 teachers or 1,000, our flexible platform scales without compromising quality.",
  },
  {
    icon: Target,
    title: "Personalized Learning & Content Alignment",
    description:
      "Every module is built to reflect your school’s unique goals, teaching challenges, and values.",
  },
  {
    icon: NoteCardIcon,
    title: "Better Outcomes for Teachers & Students",
    description:
      "Teachers gain real, classroom-ready strategies that drive engagement and improve student performance — while supporting educator well-being.",
  },
  {
    icon: GlobeGraduate,
    title: "Global Best Practices, Locally Adapted",
    description:
      "We bring international teaching innovations while tailoring them to your country’s curriculum, culture, and classroom realities.",
  },
  {
    icon: TrendIcon,
    title: "Continuous Development, Not Just One-Off Training",
    description:
      "We provide refresher modules, new content updates, and check-ins that help your CPD program grow with your teachers.",
  },
  {
    icon: ScaleIcon,
    title: "Measurable Impact & Accountability",
    description:
      "Use real-time analytics to track teacher engagement, course completion, and progress — and refine your strategy with data.",
  },
  {
    icon: TalentIcon,
    title: "Reputation & Talent Attraction",
    description:
      "Show teachers you care. High-quality CPD improves retention, builds community, and positions your institution as a forward- thinking place to work and grow.",
  },
];

export const WhySchoolsTrustUs = () => {
  return (
    <section className="py-10 sm:py-20 max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
      <div className="space-y-8 md:space-y-16">
        <div className="space-y-2.5 text-center">
          <Pill text="Benefits of Partnering with EduAI Pro" pillBg="#F1F5FF" />
          <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl">
            Why Schools Trust EduAI Pro for Smarter CPD
          </h2>
        </div>
        <div className="space-y-10">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            {reasons.map((a, i) => (
              <li
                key={generateKey()}
                className="font-medium bg-primary-100 p-5 rounded-xl space-y-14"
              >
                <div className="w-fit">
                  <a.icon width={48} height={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg text-primary">{a.title}</h3>
                  <p>{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
