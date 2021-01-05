import React from 'react';
import { quizType, questionType } from './Types/types';

export const getQuizDetail = async (
  totalQuestions: number,
  level: string
): Promise<questionType[]> => {
  let response = await fetch(
    `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`
  );
  let { results } = await response.json();
  let quiz: questionType[] = results.map((questionObj: quizType) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      correct_answer: questionObj.correct_answer,
      options: [
        ...questionObj.incorrect_answers,
        questionObj.correct_answer,
      ].sort(() => Math.random() - 0.5),
    };
  });
  return quiz;
};
