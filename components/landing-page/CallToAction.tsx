import { Button } from "../ui/button";
import { BaseCard } from "./BaseCard";
import { appIcons } from "./data";

export default function CallToAction() {
  return (
    <section className="py-20">
      {" "}
      <div className="max-w-[70%] mx-auto">
        <BaseCard>
          <div className="text-center space-y-5 max-w-[80%] mx-auto">
            <h2 className="font-semibold text-4xl text-primary">
              Take Your Teaching to the Next Level with EduAiPro's Mobile App
            </h2>
            <p className="font-medium">
              Stay connected and enhance your learning anytime, anywhere with
              EduAiPro's mobile app. Access courses, track your progress, and
              get support from our AI chatbot—all at your fingertips. Download
              now and start maximizing your teaching potential on the go!
            </p>

            <div className="flex items-center gap-3 w-fit mx-auto">
              {appIcons.map((p) => (
                <Button key={p.platformName}>
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
