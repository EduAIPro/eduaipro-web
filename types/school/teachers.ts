export type Teacher = {
  name: string;
  email: string;
  phone: string;
  level: string;
  status: string;
  createdAt: string;
};

export type Certificate = {
  name: string;
  course: string;
  id: string;
  timeline: {
    start: Date;
    end: Date;
  };
  progress: number;
  issued: Date;
  expires: Date;
};
