import React from "react";

import { FiArrowLeft } from "react-icons/fi";

const Button = ({ currentPage, setCurrentPage }) => {
  return (
    <button
      disabled={currentPage === 1}
      className="disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2 bg-white text-zinc-800 hover:text-brand border border-zinc-200 font-bold px-5 py-3 text-[10px] tracking-widest uppercase transition-all duration-200 select-none btn-tactile cursor-pointer rounded-none"
      onClick={() => {
        setCurrentPage((prev) => prev - 1);
      }}
    >
      <FiArrowLeft className="w-3.5 h-3.5" />
      <span>Prev</span>
    </button>
  );
};

export default Button;
