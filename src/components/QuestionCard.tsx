import React, { useState } from 'react';
import { questionPropsType } from '../Types/types';
import '../App.css';

const QuestionCard: React.FC<questionPropsType> = ({
  question,
  options,
  callBack,
}) => {
  let [selectedAns, setSelectedAns] = useState('');
  const handelSubmit = (e: any) => {
    setSelectedAns(e.target.value);
  };
  return (
    <div className='question-container'>
      <div className='question'>
        <h3>{question}</h3>
      </div>
      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callBack(e, selectedAns)}
      >
        {options.map((opt, index) => {
          return (
            <div className='options' key={index}>
              <label className='label'>
                <input
                  type='radio'
                  name='opt'
                  value={opt}
                  required
                  onChange={handelSubmit}
                  checked={selectedAns === opt}
                />
                {opt}
              </label>
            </div>
          );
        })}

        <button type='submit' id='btn'>
          Next
        </button>
      </form>
    </div>
  );
};

export default QuestionCard;
