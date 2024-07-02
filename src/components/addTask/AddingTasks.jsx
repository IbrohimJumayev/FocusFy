import { useEffect, useState } from "react";
import addSound from "../../assets/add.mp3";
import deleteSound from "../../assets/delete.mp3";
import doneSound from "../../assets/done.mp3";
import undoSound from "../../assets/undo.mp3";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyDone = () => toast("Task was done!");
const notifyDelete = () => toast("Task was deleted!");

const AddingTasks = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [newTask, setNewTask] = useState("");
  const [doneTodos, setDoneTodos] = useState(
    localStorage.getItem("doneTodos")
      ? JSON.parse(localStorage.getItem("doneTodos"))
      : []
  );

  function playSounds(props) {
    new Audio(props).play();
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
  }, [doneTodos]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const TASK = {
        id: Date.now(),
        taskName: newTask,
        done: false,
      };
      setTodos([...todos, TASK]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((t) => t.id !== id);
        setTodos(updatedTodos);
        playSounds(deleteSound);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
        notifyDelete();
      }
    });
  };

  const doneTasks = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    const doneTask = todos.find((t) => t.id === id);

    setDoneTodos([...doneTodos, doneTask]);
    setTodos(updatedTodos);
  };

  const undo = (id) => {
    const updatedTasks = doneTodos.filter((d) => d.id !== id);
    const taskUndoList = doneTodos.filter((d) => d.id === id);

    setTodos([...todos, taskUndoList[0]]);
    setDoneTodos(updatedTasks);
  };

  return (
    <div className="mt-7 px-3">
      <ToastContainer />
      <form className="flex justify-between gap-3" onSubmit={addTask}>
        <input
          className="outline-none border-b-2 focus:border-b-blue-800 duration-100 font-bold text-xl w-full"
          type="text"
          placeholder="Add task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button
          onClick={() => {
            playSounds(addSound);
          }}
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 active:scale-75 duration-100"
        >
          Add
        </button>
      </form>
      <h1 className="font-black mb-5 mt-5 text-blue-900">
        Tasks to do: {todos.length}
      </h1>
      <div>
        <ul className="mt-5">
          {todos.map((t) => (
            <li className="flex justify-between py-1" key={t.id}>
              <p className="text-xl font-bold">{t.taskName}</p>
              <div className="flex gap-5">
                <button
                  className="active:scale-75"
                  onClick={() => {
                    doneTasks(t.id);
                    playSounds(doneSound);
                    notifyDone()
                  }}
                >
                  <span className="material-symbols-outlined">check</span>
                </button>

                <button
                  onClick={() => {
                    deleteTask(t.id);
                    playSounds(deleteSound);
                  }}
                  className="active:scale-75"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h1 className="font-black mb-5 mt-5 text-green-600">
          Done tasks: {doneTodos.length}
        </h1>
        <ul className="mt-5 mb-5">
          {doneTodos.map((d) => (
            <li className="flex justify-between py-1" key={d.id}>
              <p className="text-xl font-bold line-through">{d.taskName}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    undo(d.id);
                    playSounds(undoSound);
                  }}
                  className="active:scale-75"
                >
                  <span className="material-symbols-outlined">undo</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddingTasks;
