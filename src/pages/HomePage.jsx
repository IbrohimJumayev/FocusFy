import React, { useEffect } from "react";
import { useState, createContext } from "react";
import Navbar from "../components/navBar/Navbar";
import Timer from "../components/Timer/Timer";
import TodoList from "../components/todos/TodoList";
import AddTodo from "../components/todos/AddTodo";
import DoneTodosList from "../components/todos/DoneTodosList";

export const timerContext = createContext();
const HomePage = () => {
  const [timer, setTimer] = useState(25 * 60 * 1000);
  const [breaktime, setBreakTime] = useState(5 * 60 * 1000);
  const [timerOn, setTimerOn] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [doneTodos, setDoneTodos] = useState([]);

  const api_url = "http://localhost:3000";

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${api_url}/todos`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`The network was not ok, ${errorText}`);
        }
        const todosList = await response.json();
        setTodos(todosList);
      } catch (error) {
        console.error("Error fetching todos", error.message);
        setFetchError(error.message);
      } finally {
        setIsloading(false);
      }
    }
    fetchTodos();
  }, []);

  async function Addtasks() {
    const TODO = {
      id: Date.now().toString(),
      taskName: newTodo,
      done: false,
    };

    try {
      const response = await fetch(`${api_url}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TODO),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`The network was not ok, ${errorText}`);
      }
      if (newTodo.trim() !== "") {
        const newTodos = [...todos, TODO];
        setTodos(newTodos);
        setNewTodo("");
      }
    } catch (error) {
      console.error("Error adding todos", error.message);
    }
  }

  async function DeleteTodos(id) {
    try {
      const response = await fetch(`${api_url}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "appliction/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nework was not ok, ${errorText}`);
      }
      const updatedTodos = todos.filter((t) => t.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo", error.message);
    }
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    Addtasks();
  };

  return (
    <>
      <div className="max-w-xl border-solid m-auto">
        <timerContext.Provider
          value={{
            timer,
            setTimer,
            timerOn,
            setTimerOn,
            breaktime,
            setBreakTime,
            isDisabled,
            setIsDisabled,
            todos,
            setTodos,
            newTodo,
            setNewTodo,
            doneTodos,
            setDoneTodos,
            DeleteTodos,
          }}
        >
          <Navbar />
          <Timer />
          <div>
            <AddTodo handleSubmit={handleSubmit} />
            <main>
              {isLoading && <p>Loading...</p>}
              {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
              {!isLoading && !fetchError && <TodoList />}
              <DoneTodosList />
            </main>
          </div>
        </timerContext.Provider>
      </div>
    </>
  );
};

export default HomePage;
