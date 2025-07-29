export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export type SubjectYearData = {
  [year: string]: Question[];
};

export type AllSubjectsData = {
  [subject: string]: SubjectYearData;
};
