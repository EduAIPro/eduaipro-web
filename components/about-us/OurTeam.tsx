type OurTeamProps = {};

export const OurTeam = ({}: OurTeamProps) => {
  return (
    <section className="bg-primary py-12 md:py-20">
      <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto grid max-md:gap-5 md:grid-cols-2 text-white">
        <div>
          <h2 className="text-2xl md:text-4xl font-semibold">Our Team</h2>
        </div>
        <div>
          <p>
            Our team is composed of a diverse group of experts, educators, AI
            developers and professionals dedicated to delivering exceptional
            continued professional development services. Each member of our team
            brings a wealth of experience, ensuring that our courses are not
            only relevant but also impactful. We work closely with partners and
            accreditation body to provide the most up-to-date and accredited
            learning experiences.
          </p>
        </div>
      </div>
    </section>
  );
};
