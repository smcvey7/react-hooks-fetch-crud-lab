import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, removeQuestion, handleUpdate }) {

  return (
    <section>
      <ul>
        {questions.map(item=>{
          return <QuestionItem updateAnswer={handleUpdate} passRemove={removeQuestion} key={item.prompt} question={item} />
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
