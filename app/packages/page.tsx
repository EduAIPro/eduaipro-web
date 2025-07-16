"use client";
import { pricingData } from "@/components/common/data";
import Pill from "@/components/common/ui/Pill";
import Typography from "@/components/common/ui/Typography";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { Button } from "@/components/ui/button";
import { generateKey } from "@/utils/key";

export default function PricingPage() {
  return (
    <>
      <section className="max-w-full max-lg:px-5 pt-28 sm:pt-32 lg:max-w-[85%] mx-auto flex flex-col gap-7 md:gap-14 animate-fade-in-up">
        <div className="text-center md:max-w-[70%] mx-auto flex flex-col gap-3">
          <Pill text="Packages" pillBg="#F1F5FF" />
          <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
            More Value, Less Cost
          </h2>
          <Typography.P weight="medium" fontColor="medium">
            With EduAi Pro, you get access to a wide range of features and tools
            that will help you achieve your goals, all at a price {"that's"}{" "}
            affordable and transparent.
          </Typography.P>
        </div>
        <div className="w-full">
          {pricingData.map((item, index) => (
            <div key={item.title} className={`p-2 w-full flex-1`}>
              <div
                className={`rounded-lg h-full mx-auto flex flex-col justify-between gap-8`}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-semibold text-2xl md:text-3xl">
                      {item.title}
                    </h2>
                    <Typography.P weight="medium" fontColor="medium">
                      {item.description}
                    </Typography.P>
                  </div>
                  <div>
                    <Typography.P weight="semibold" fontColor="medium">
                      {"What's included?"}
                    </Typography.P>
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 max-sm:gap-8 gap-5 mt-8">
                      {item.features.map((item) => (
                        <li
                          className="flex flex-col items-start gap-2"
                          key={generateKey()}
                        >
                          <div className="w-fit mb-2">
                            <item.icon className="text-primary-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">
                              {item.title}
                            </h3>

                            {item.description ? (
                              <Typography.P
                                size="small"
                                weight="medium"
                                fontColor="grey"
                              >
                                {item.description}
                              </Typography.P>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <Button
                    className="font-semibold max-sm:w-full"
                    onClick={() => {
                      window.open("mailto:support@eduaipro.ng", "_blank");
                    }}
                  >
                    <p> Contact support</p>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
