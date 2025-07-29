import { type AllSubjectsData } from "./types";
import { Atom, BookText, FlaskConical, Leaf, Sigma } from "lucide-react";

export const data: AllSubjectsData = {
  Chemistry: {
    "2023": [
      {
        id: 1,
        question: "What is the chemical symbol for Sodium?",
        options: ["So", "Sm", "Sn", "Na"],
        answer: "Na",
      },
      {
        id: 2,
        question: "Which of the following is a noble gas?",
        options: ["Oxygen", "Nitrogen", "Argon", "Chlorine"],
        answer: "Argon",
      },
    ],
    "2022": [
      {
        id: 1,
        question: "The process of converting a liquid to a gas is called?",
        options: ["Evaporation", "Condensation", "Freezing", "Melting"],
        answer: "Evaporation",
      },
    ],
  },
  Biology: {
    "2023": [
      {
        id: 1,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"],
        answer: "Mitochondrion",
      },
      {
        id: 2,
        question: "Photosynthesis primarily occurs in which part of the plant?",
        options: ["Roots", "Stem", "Leaves", "Flowers"],
        answer: "Leaves",
      },
    ],
  },
   "Physics": {
    "2023": [
      {
        id: 1,
        question: "What is the unit of electric current?",
        options: ["Volt", "Ohm", "Watt", "Ampere"],
        answer: "Ampere",
      },
    ],
  },
  "Mathematics": {
    "2023": [
      {
        id: 1,
        question: "What is the value of Pi (π) to two decimal places?",
        options: ["3.12", "3.14", "3.16", "3.18"],
        answer: "3.14",
      },
    ],
  },
    "English": {
    "2023": [
      {
        id: 1,
        question: "Choose the word that is opposite in meaning to 'brave'.",
        options: ["Bold", "Cowardly", "Strong", "Heroic"],
        answer: "Cowardly",
      },
    ],
  },
};

export const getSubjects = () => Object.keys(data);

export const getYearsForSubject = (subject: string) => {
  if (data[subject]) {
    return Object.keys(data[subject]).sort((a, b) => Number(b) - Number(a));
  }
  return [];
};

export const getQuestions = (subject: string, year: string) => {
  return data[subject]?.[year] || [];
};

export const getTotalQuestionsInSubject = (subjectName: string) => {
  const subjectData = data[subjectName];
  if (!subjectData) return 0;

  return Object.values(subjectData).reduce((total, questions) => total + questions.length, 0);
};

export const getSubjectIcon = (subjectName: string) => {
    switch(subjectName) {
        case 'Chemistry': return FlaskConical;
        case 'Biology': return Leaf;
        case 'Physics': return Atom;
        case 'Mathematics': return Sigma;
        case 'English': return BookText;
        default: return BookText;
    }
}
