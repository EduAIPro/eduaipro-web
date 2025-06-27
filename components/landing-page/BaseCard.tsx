import { ReactNode } from "react";

type BaseCardProps = {
  children: ReactNode;
};

export const BaseCard = ({ children }: BaseCardProps) => {
  return (
    <div className="rounded-[20px] bg-primary-100 px-10 py-20 relative overflow-hidden">
      <div
        style={{ filter: "blur(250px)" }}
        className="filter-[250px] absolute -left-40 -top-40 size-[508px] rounded-full bg-primary-400/20 "
      ></div>
      {children}

      <div
        style={{ filter: "blur(250px)" }}
        className="filter-[250px] absolute -bottom-40 -right-40 size-[508px] rounded-full bg-primary-400/50 "
      ></div>
    </div>
  );
};
