"use client";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Typography from "../common/ui/Typography";

const sections = [
  { id: "objectives", title: "Objectives" },
  { id: "outcomes", title: "Outcomes" },
  { id: "courses", title: "Courses" },
];

const StickyHeader = ({
  courseName,
  sectionsData,
}: {
  courseName: string;
  sectionsData?: { id: string; title: string }[];
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling 200px
      setIsVisible(window.scrollY > 600);

      // Find the current section
      const current = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md shadow-grey-3 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="max-sm:px-4 max-md:px-6 max-lg:px-[56px] max-xl:px-[64px] xl:max-w-[1350px] xl:mx-auto">
          <div className="flex sm:items-center max-sm:flex-col max-sm:gap-3 justify-between border-b border-grey-5 pb-3 pt-4">
            <div className="flex items-center gap-4">
              <Image
                src={"/assets/images/logo-no-bg.png"}
                width={220}
                height={80}
                className="w-[140px] h-[36px] max-sm:hidden"
                alt=""
              />
              <Typography.H2 className="text-base md:!text-lg capitalize">
                {courseName}
              </Typography.H2>
            </div>
            <Button
              onClick={() => router.push("/register")}
              className=" btn md:!w-fit"
              variant="solid"
            >
              <Typography.P fontColor="white">Enroll</Typography.P>
            </Button>
          </div>
          <ul className="flex items-center gap-3 md:gap-10 py-3">
            {(sectionsData ?? sections).map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`px-2 xs:px-4 pb-2 transition-all duration-300 transform ${
                    activeSection === section.id
                      ? "border-accent-700 border-b-2 scale-105"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Typography.P
                    weight="medium"
                    className="max-sm:!text-sm !text-base"
                  >
                    {section.title}
                  </Typography.P>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default StickyHeader;
