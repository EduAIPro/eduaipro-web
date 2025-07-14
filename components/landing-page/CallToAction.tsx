import { Button } from "../ui/button";
import { BaseCard } from "./BaseCard";
import { appIcons } from "./data";

export default function CallToAction() {
  return (
    <section className="py-10 md:py-20">
      <div className="max-mx:px-5 md:max-w-[80%] lg:max-w-[70%] mx-auto max-md:px-5">
        <BaseCard>
          <div className="text-center space-y-5 md:max-w-[80%] mx-auto">
            <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-primary">
              Take Your Teaching to the Next Level with {"EduAiPro's"} Mobile
              App
            </h2>
            <p className="font-medium">
              Stay connected and enhance your learning anytime, anywhere with
              {" EduAiPro's"} mobile app. Access courses, track your progress,
              and get support from our AI chatbot—all at your fingertips.
              Download now and start maximizing your teaching potential on the
              go!
            </p>

            <div className="flex max-md:flex-col items-center gap-3 w-fit mx-auto">
              {appIcons.map((p) => (
                <Button key={p.platformName} className="max-sm:w-full">
                  <p.icon variant="Bold" color="white" />
                  Coming soon on {p.platformName}
                </Button>
              ))}
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  );
}
