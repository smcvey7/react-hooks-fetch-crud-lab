import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then(data=>setQuestions(data))
  }, [])

  function addQuestion(newQuestion){
    const newQuestionData = {
      prompt : newQuestion.prompt,
      answers: [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4],
      correctIndex: parseInt(newQuestion.correctIndex, 10)
    }

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(newQuestionData)
    })
    .then(r=>r.json())
    .then(data=>setQuestions([...questions, newQuestionData]))

    setPage("List")
  }

  function handleRemove(num){
    console.log("id", num)

    fetch(`http://localhost:4000/questions/${num}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    })
    .then(()=>console.log("deleted"))

    const filteredQuestions = questions.filter((item)=>{
      return item.id !== num;
    })

    setQuestions(filteredQuestions)

  }

  function performUpdate(num, id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "PATCH",
      headers : {
        "Content-Type" : "Application/json",
      },
      body : JSON.stringify({
        correctIndex : num
      })
    })

    const updatedQuestionList = questions.map((item)=>{
      if (item.id === id){
        return {
          ...item,
          correctIndex: num
        }
      }else return item
    })
    setQuestions(updatedQuestionList)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} onSubmitHandle={addQuestion} /> : <QuestionList handleUpdate={performUpdate} removeQuestion={handleRemove} questions={questions} />}
    </main>
  );
}

export default App;
