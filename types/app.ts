export type Course = {
  id: string;
  name: string;
  bgImage: string;
  img: string;
  students: string;
  description: string;
  overview: {
    introduction: string;
    objectives: string[];
    duration: {
      totalHours: number;
      numberOfUnits: number;
      hoursPerUnit: string;
    };
  };
  structure: {
    format: string;
    resources: string[];
  };
  certification: {
    type: string;
    benefits: string[];
  };

  skillsAndCompetencies: { title: string; description: string }[];
  accessibility: {
    platforms: string[];
    features: string[];
  };
  support: {
    features: string[];
  };
  units: CourseUnit[];
};

type CourseUnit = {
  number: number;
  title: string;
  introduction: string;
  objectives: string[];
  modules: CourseModule[];
  // totalDuration: number;
};

type CourseModule = {
  title: string;
  // duration: number;
  content: {
    title: string;
    // readingMaterial: string;
    lessonType?: string;
    page: number;
  }[];
};
