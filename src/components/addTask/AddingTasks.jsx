import { useEffect, useState } from "react";

const AddingTasks = () => {
  const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const [newTask, setNewTask] = useState("");
  const [doneTodos, setDoneTodos] = useState(localStorage.getItem("doneTodos") ? JSON.parse(localStorage.getItem("doneTodos")) : []);

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
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
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
      <form className="flex justify-between" onSubmit={addTask}>
        <input
          className="outline-none border-b-black focus:border-b duration-100 font-bold text-xl"
          type="text"
          placeholder="Add task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button
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
                  onClick={() => doneTasks(t.id)}
                >
                  <span className="material-symbols-outlined">check</span>
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
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
        <ul className="mt-5">
          {doneTodos.map((d) => (
            <li className="flex justify-between py-1" key={d.id}>
              <p className="text-xl font-bold line-through">{d.taskName}</p>
              <div className="flex gap-3">
                <p className="flex items-center gap-1">
                  <strong className="text-xl text-blue-600">n time</strong>
                  <span class="material-symbols-outlined">timelapse</span>
                </p>
                <button onClick={() => undo(d.id)} className="active:scale-75">
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
