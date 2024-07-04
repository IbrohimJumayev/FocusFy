const DoneTodoItem = ({ d }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className=" flex items-center gap-2">
        <span className="text-xl font-bold">{d.taskName}</span>
      </div>
      <button>
        <span className="material-symbols-outlined">undo</span>
      </button>
    </div>
  );
};

export default DoneTodoItem;
