"use client";
import { pricingData } from "@/components/common/data";
import Pill from "@/components/common/ui/Pill";
import Typography from "@/components/common/ui/Typography";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { generateKey } from "@/utils/key";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { BsPatchCheckFill } from "react-icons/bs";

export default function PricingPage() {
  const router = useRouter();
  return (
    <div>
      <section className="max-w-full lg:max-w-[80%] mx-auto flex flex-col gap-7 md:gap-14 mt-12 md:mt-24">
        <div className="text-center md:max-w-[70%] mx-auto flex flex-col gap-3">
          <Pill text="PRICING" />
          <Typography.H2 weight="bold">More Value, Less Cost</Typography.H2>
          <Typography.P weight="medium" fontColor="medium">
            With EduAi Pro, you get access to a wide range of features and tools
            that will help you achieve your goals, all at a price {"that's"}{" "}
            affordable and transparent.
          </Typography.P>
        </div>
        <div className="md:grid md:grid-cols-2 gap-4 justify-between w-full">
          {pricingData.map((item, index) => (
            <div
              key={item.title}
              className={`${
                index === 0
                  ? "rounded-l-[32px] rounded-r-lg"
                  : "rounded-l-lg rounded-r-[32px]"
              } p-2 w-full border border-grey-2 max-md:!rounded-[32px] flex-1`}
            >
              <div
                className={`${
                  index === 0
                    ? "from-accent-100 to-accent-100/20 rounded-l-[32px] rounded-r-lg"
                    : "from-[#FFF8E6]/50 to-warning-100/10 rounded-l-lg rounded-r-[32px]"
                } rounded-lg px-6 p-6 md:py-8 bg-gradient-45 h-full mx-auto max-md:!rounded-[32px] flex flex-col justify-between gap-8`}
              >
                <div className="flex flex-col gap-7">
                  <div>
                    <Typography.H4 weight="semibold">
                      {item.title}
                    </Typography.H4>
                    <Typography.P weight="medium" fontColor="medium">
                      {item.description}
                    </Typography.P>
                  </div>
                  <div className="flex items-end">
                    <Typography.H1 weight="semibold" fontColor="dark">
                      {item.price}
                    </Typography.H1>
                    {item.interval ? (
                      <Typography.P
                        weight="semibold"
                        fontColor="medium"
                        className="inline"
                      >
                        /{item.interval}
                      </Typography.P>
                    ) : null}
                  </div>
                  <div>
                    <Typography.P weight="semibold" fontColor="medium">
                      {"What's included?"}
                    </Typography.P>
                    <ul className="flex flex-col gap-2 mt-3">
                      {item.features.map((item) => (
                        <li
                          className="flex items-start sm:items-center gap-2"
                          key={generateKey()}
                        >
                          <div className="w-fit">
                            <BsPatchCheckFill
                              size={20}
                              className="text-gray-800"
                            />
                          </div>
                          <div>
                            <Typography.H3
                              size="base"
                              weight="medium"
                              fontColor="brand"
                            >
                              {item.title}
                            </Typography.H3>
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
                    onClick={() => {
                      if (index === 0) {
                        router.push("/register");
                      }
                    }}
                    className={`${
                      index === 0 ? "primary__btn" : ""
                    } btn !w-full`}
                  >
                    {index === 0 ? (
                      <Typography.P fontColor="white">Get started</Typography.P>
                    ) : (
                      <Typography.P fontColor="white">
                        Contact support
                      </Typography.P>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CallToAction />
      <Footer />
    </div>
  );
}
