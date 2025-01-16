/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useScroll, useTransform } from "framer-motion";

const categories = [
  {
    title: "Teaching Assistants",
    points: [
      "Learn effective lesson planning and classroom management.",
      "Support students with special needs and foster inclusivity.",
      "Gain certifications and skills for expanded roles.",
      "Use classroom tools effectively and strengthen teamwork.",
    ],
    color: "#4caf50", // Green
  },
  {
    title: "Primary Teachers",
    points: [
      "Integrate creative methods like play-based learning.",
      "Maintain structure and address disruptive behavior.",
      "Leverage digital tools for interactive lessons.",
      "Build leadership skills and network with peers.",
    ],
    color: "#2196f3", // Blue
  },
  {
    title: "Secondary Teachers",
    points: [
      "Deepen subject expertise and stay updated on trends.",
      "Use tools and platforms for interactive learning.",
      "Prepare for leadership roles and earn certifications.",
      "Connect with peers and refine assessments.",
    ],
    color: "#ff9800", // Orange
  },
  {
    title: "Higher Education Teachers",
    points: [
      "Master strategies like flipped classrooms.",
      "Design innovative courses and integrate research.",
      "Use online tools and stay current with digital trends.",
      "Prepare for administrative roles and engage with communities.",
    ],
    color: "#9c27b0", // Purple
  },
];

export default function TeachersBenefits() {
  const { scrollY } = useScroll();

  return (
    <div>
      <article className="bg-0">
        <h1>How We Work</h1>
      </article>
      <article>
        <h2>Welcome</h2>
        <p>Scroll down to find out more</p>
      </article>

      <section className="holder">
        <header className="holder__head bg-3">
          1 STEP &mdash; IDENTIFYING STRENGTHS AND WEAKNESSES
        </header>
        <article className="holder__item bg-3">
          <h2>IDENTIFYING STRENGTHS AND WEAKNESSES</h2>
          <p>
            OUR MULTIDISCIPLINARY TEAM IS HERE TO IDENTIFY BOTH YOUR STRENGTHS
            AND WEAKNESSES, WITH THE AMBITION TO UNDERSTAND HOW TO BEST ASSIST
            IN GROWING YOUR BRAND AND REACHING YOUR COMMUNITY.
          </p>
        </article>

        <header className="holder__head bg-0">
          2 STEP &mdash; PUTTING THE PIECESTOGETHER
        </header>
        <article className="holder__item bg-0">
          <h2>PUTTING THE PIECESTOGETHER</h2>
          <p>
            BASED ON RESEARCH AND DISCUSSIONS, WE WILL SINGLE OUT THE BEST
            MEDIUM OR MEDIUMS TO TRANSLATE YOUR BRAND.
          </p>
        </article>

        <header className="holder__head bg-2">
          3 STEP &mdash; FINE-TUNING YOUR CONTENT
        </header>
        <article className="holder__item bg-2">
          <h2>FINE-TUNING YOUR CONTENT</h2>
          <p>
            BY PRESENTING OUR WORK TO YOU THROUGH OPEN DIALOGUE, WE WILL
            FINE-TUNE YOUR CONTENT BASED ON FEEDBACK AND OUR COLLECTIVE
            EXPERTISE.
          </p>
        </article>

        <header className="holder__head bg-1">
          4 STEP &mdash; COMPLETING THE PICTURE
        </header>
        <article className="holder__item bg-1">
          <h2>COMPLETING THE PICTURE</h2>
          <p>
            WHETHER PRODUCING PHOTOGRAPHY, FILM, CURATING YOUR DIGITAL PLATFORMS
            OR CREATING A COHESIVE BRAND IDENTITY AND STRATEGY, WE WILL PACKAGE
            UP ALL OUR WORK AND ASSETS INTO AN ORGANISED LIBRARY A PACKAGE THAT
            IS SIMPLE FOR YOU TO ENGAGE WITH.
          </p>
        </article>
      </section>

      <article className="bg-4">
        <h2>First footer</h2>
      </article>
      <article className="bg-0">
        <h2>Second footer</h2>
      </article>
    </div>
  );
}

// export default function TeachersBenefits() {
//   return (
//     <div className="scroll-container">
//       {categories.map((category, index) => (
//         <motion.div
//           className="card"
//           key={index}
//           style={{ backgroundColor: category.color }}
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.2 }}
//         >
//           <h2>{category.title}</h2>
//           <ul>
//             {category.points.map((point, i) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// export default function TeachersBenefits() {
//   return (
//     <div className="scroll-container">
//       {categories.map((category, index) => (
//         <motion.div
//           className="card"
//           key={index}
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.2 }}
//         >
//           <h2>{category.title}</h2>
//           <ul>
//             {category.points.map((point, i) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         </motion.div>
//       ))}
//     </div>
//   );
// }
