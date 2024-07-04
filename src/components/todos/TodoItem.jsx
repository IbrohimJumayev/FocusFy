import { useContext } from "react";
import { timerContext } from "../../pages/HomePage";

const TodoItem = ({ t }) => {
  const { DeleteTodos } = useContext(timerContext);
  return (
    <div className="flex items-center justify-between mb-3">
      <div className=" flex items-center gap-2">
        <span className="text-xl font-bold">{t.taskName}</span>
      </div>
      <div className="flex gap-3 items-center">
        <button
          className=" px-2 py-1 text-center"
        >
          <span className="material-symbols-outlined">check</span>
        </button>
        <button onClick={() => DeleteTodos(t.id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
