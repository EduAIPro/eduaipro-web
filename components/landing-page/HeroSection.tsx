import Pill from "../common/ui/Pill";
import { Button } from "../ui/button";
import CompaniesMarquee from "./CompaniesMarquee";
import { appIcons } from "./data";

export default function HeroSection() {
  return (
    <section className="w-full pt-32 sm:pt-40 max-md:px-5 min-h-[90vh] sm:min-h-screen bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] flex flex-col items-center justify-center">
      <div className="md:max-w-3xl overflow-hidden mx-auto text-center space-y-12 md:space-y-[80px] animate-fade-in-up">
        <div className="space-y-5">
          <div className="space-y-3">
            <Pill text="🚀 Enhance Teaching Excellence." pillBg="#dfe7fa" />

            <h1 className="text-grey-800 font-semibold text-3xl md:text-5xl">
              Access the {"world's"} best AI-Powered Accredited CPD Program
            </h1>
          </div>
          {/* <Button
          // onClick={() => {
          //   // throw new Error("test err");
          // }}
          >
            throw error
          </Button> */}
          <div>
            <p className="text-base text-grey-800 font-medium">
              Transform your teaching with {"EduAIPro's"} Accredited Continued
              Professional Development (CPD) courses. Designed for mentors,
              teaching assistants, primary, secondary, and higher institution
              educators, our AI-powered platform equips you with the tools to
              thrive and make a lasting impact.
            </p>
          </div>
          <div className="flex max-sm:flex-col items-center gap-3 sm:w-fit mx-auto">
            {appIcons.map((p) => (
              <Button key={p.platformName} className="max-sm:w-full">
                {/* <p.icon variant="Bold" color="white" /> */}
                Coming soon on {p.platformName}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="space-y-3 overflow-x-clip max-w-[calc(100vw-40px)]">
            <p className="font-medium text-grey-800">
              Trusted by 20+ innovative institutions worldwide
            </p>
            <CompaniesMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
