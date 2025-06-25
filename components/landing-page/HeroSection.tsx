import Pill from "../common/ui/Pill";
import { Button } from "../ui/button";
import CompaniesMarquee from "./CompaniesMarquee";
import { appIcons } from "./data";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center space-y-16 md:space-y-[100px] animate-fade-in-up">
        <div className="space-y-5">
          <div className="space-y-3">
            <Pill text="🚀 Enhance Teaching Excellence." pillBg="#dfe7fa" />

            <h1 className="text-grey-800 font-semibold text-5xl">
              Access the world's best AI-Powered Accredited CPD Program
            </h1>
          </div>
          <div>
            <p className="text-base text-grey-800 font-medium">
              Transform your teaching with EduAI Pro's accredited Continued
              Professional Development (CPD) courses. Designed for mentors,
              teaching assistants, primary, secondary, and higher institution
              educators, our AI-powered platform equips you with the tools to
              thrive and make a lasting impact.
            </p>
          </div>
          <div className="flex items-center gap-3 w-fit mx-auto">
            {appIcons.map((p) => (
              <Button key={p.platformName}>
                <p.icon variant="Bold" color="white" />
                Coming soon on {p.platformName}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="space-y-3">
            <p className="font-medium text-grey-800">
              Trusted by 50+ innovative institutions worldwide
            </p>
            <CompaniesMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
