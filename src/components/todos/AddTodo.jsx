import { useContext } from "react";
import { timerContext } from "../../pages/HomePage";

const AddTodo = ({ handleSubmit }) => {
  const { newTodo, setNewTodo } = useContext(timerContext);
  return (
    <div>
      <form
        className="flex items-center gap-5 justify-between mt-5 px-5  mb-5"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 w-full px-4 py-2 text-xl font-bold outline-none focus:border-blue-600"
          type="text"
          required
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button className="border-2 border-black rounded-md px-3 pt-2 py-1 text-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
