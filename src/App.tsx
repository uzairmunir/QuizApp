import React, { useEffect, useState } from 'react';
import { getQuizDetail } from './Api';
import QuestionCard from './components/QuestionCard';
import { questionType } from './Types/types';
import './App.css';

const App = () => {
  let [questionNum, setQuestionNum] = useState(1);
  let [quiz, setQuiz] = useState<questionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [result, showResult] = useState(false);
  useEffect(() => {
    const fetchedData = async () => {
      let questions: questionType[] = await getQuizDetail(10, 'medium');
      setQuiz(questions);
      console.log(questions);
    };
    fetchedData();
  }, []);
  if (!quiz.length) {
    return <h3>Loading...</h3>;
  }
  const handelSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: questionType = quiz[currentStep];
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }
    if (currentStep !== quiz.length - 1) {
      setCurrentStep(++currentStep);
      setQuestionNum(++questionNum);
    } else {
      showResult(true);
    }
  };
  const startAgain = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    showResult(false);
    setCurrentStep(0);
    setScore(0);
    setQuestionNum(0);
  };
  if (result) {
    return (
      <div className='result'>
        <h2>Result</h2>
        <p>
          Your Final Score is :
          <span>
            <h2>{score}</h2>
          </span>
        </p>
        <button id='btn' onClick={startAgain}>
          Start Again
        </button>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className='h1'>React Quiz</h1>
      <h2> Your Score : {score}</h2>
      <h4>Question Number : {questionNum}</h4>
      <QuestionCard
        options={quiz[currentStep].options}
        question={quiz[currentStep].question}
        callBack={handelSubmit}
      />
    </div>
  );
};

export default App;
