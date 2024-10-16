"use client";
import React from "react";
import Typography from "../common/ui/Typography";
import { generateKey } from "@/utils/key";
import { features } from "./data";
import Pill from "../common/ui/Pill";

export default function ReasonsToChooseUs() {
  return (
    <section className="responsive__section">
      <div className="flex flex-col gap-y-12">
        <div className="text-center flex flex-col gap-y-6">
          <Pill text="WHY CHOOSE US" />

          <div>
            <Typography.H2 weight="semibold" size="xlarge">
              A Platform Designed for Educators <br /> Supercharged by{" "}
              <span className="gradient__text">AI</span>
            </Typography.H2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 w-4/5 mx-auto">
          {features.map((item) => (
            <div
              key={generateKey()}
              className="rounded-xl bg-white p-4 displace__animation box__shadow"
            >
              <div className="flex gap-x-5">
                <div
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `-5px 5px 15px 4px ${item.color}2B`,
                  }}
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
