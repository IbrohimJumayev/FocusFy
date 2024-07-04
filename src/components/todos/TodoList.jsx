import { useContext } from "react";
import { timerContext } from "../../pages/HomePage";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useContext(timerContext);
  return (
    <div className="flex-col  px-5">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Tasks to do: {todos.length}
      </h1>
      {todos.map((t) => (
        <TodoItem key={t.id} t={t} />
      ))}
    </div>
  );
};

export default TodoList;
