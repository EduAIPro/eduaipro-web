import React from "react";
import Typography from "../common/ui/Typography";
import { generateKey } from "@/utils/key";
import { features } from "./data";

export default function ReasonsToChooseUs() {
  return (
    <section className="py-24">
      <div className="flex flex-col gap-y-12">
        <div className="text-center flex flex-col gap-y-6">
          <div className="w-fit mx-auto rounded-full py-2 px-5 bg-brand-300">
            <Typography.H3
              weight="medium"
              size="large"
              className="text-center text-brand-1000 tracking-[5px]"
            >
              WHY CHOOSE US
            </Typography.H3>
          </div>
          <div>
            <Typography.H2 weight="semibold" size="xlarge">
              Dive into online courses on <br /> diverse subjects
            </Typography.H2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 w-2/3 mx-auto">
          {features.map((item) => (
            <div
              key={generateKey()}
              style={{ boxShadow: "-18px 32px 68px -44px rgba(0,0,0,0.1)" }}
              className="rounded-xl bg-white p-4"
            >
              <div className="flex gap-x-5">
                <div
                  style={{ backgroundColor: item.color }}
                  className={`w-fit h-fit p-4 rounded-[6px] `}
                >
                  <item.icon color="white" width={20} height={20} />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Typography.H2 weight="medium" size="large">
                    {item.title}
                  </Typography.H2>
                  <Typography.P size="small">{item.description}</Typography.P>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
