import React from "react";

function QuestionItem({ question, passRemove, updateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>{answer}</option>
  ));

  function handleDeleteClick(num){
    passRemove(num)
  }

  function onChangeAnswer(e, id){
    updateAnswer(e.target.value, id)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e)=>{onChangeAnswer(e, id)}} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={()=>handleDeleteClick(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
