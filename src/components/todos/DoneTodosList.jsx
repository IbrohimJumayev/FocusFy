import { useContext } from "react";
import { timerContext } from "../../pages/HomePage";
import DoneTodoItem from "./DoneTodoItem";

const DoneTodosList = () => {
  const { doneTodos } = useContext(timerContext);
  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        Done tasks: {doneTodos.length}
      </h1>
      <div>
        {doneTodos.map((d) => (
          <DoneTodoItem key={d.id} d={d}/>
        ))}
      </div>
    </div>
  );
};

export default DoneTodosList;
