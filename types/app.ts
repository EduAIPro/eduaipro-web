export type Course = {
  id: string;
  bgImage: string;
  name: string;
  description: string;
  topics: string[];
  overview: string;
  students: string;
  courseLength: string;
  totalTime: string;
  courseContents: {
    name: string;
    length: string;
    isResource: boolean;
  }[];
};
