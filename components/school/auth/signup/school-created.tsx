import { Check } from "lucide-react";

export const SchoolCreated = () => {
  return (
    <section className="py-20 animate-fade-in-up">
      <div className="max-w-xl mx-auto space-y-5">
        <div className="rounded-full flex items-center justify-center size-44 bg-primary-100/20 mx-auto">
          <Check className="size-12 text-primary-400" />
        </div>

        <div className="text-center space-y-3">
          <h1 className="font-semibold text-2xl">
            School registration successful
          </h1>
          <p className="font-medium text-grey-500">
            Congratulations! Your school’s registration is now complete. <br />{" "}
            <br /> A member of our team will be in touch between 24-72 hours to
            discuss a tailored pricing after which your account will be
            activated.
            <br /> We’re excited to welcome you and look forward to supporting
            your institution.
          </p>
        </div>
      </div>
    </section>
  );
};
