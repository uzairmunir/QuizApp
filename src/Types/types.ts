export type questionPropsType = {
  question: string;
  options: string[];
  callBack: (e: React.FormEvent<EventTarget>, userAns: string) => void;
};
export type quizType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
};
export type questionType = {
  question: string;
  answer: string;
  correct_answer: string;
  options: string[];
};
