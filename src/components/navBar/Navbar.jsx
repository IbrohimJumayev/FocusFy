import React from "react";

const Navbar = () => {
  return (
    <div className="mt-10 flex justify-between max-sm:mt-2 px-5 border-b border-black pb-3">
      <div className="flex items-center gap-2">
        <img className="w-8" src="/focus.svg" alt="" />
        <p className="text-xl font-bold">FocusFy</p>
      </div>
      <div className="flex gap-8 max-sm:gap-2">
        <button className="flex items-center gap-1 font-medium bg-gray-500 rounded-lg  px-5 py-2  max-sm:px-3">
          <span class="material-symbols-outlined">summarize</span>
          <span className="max-sm:hidden ">report</span>
        </button>
        <button className="flex items-center gap-1 font-medium  bg-gray-500 rounded-lg  px-3 py-2  ">
          <span class="material-symbols-outlined">tune</span>
          <span className="max-sm:hidden">settings</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
