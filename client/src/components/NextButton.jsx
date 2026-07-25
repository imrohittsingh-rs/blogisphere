import React from "react";

import { FiArrowRight } from "react-icons/fi";

const NextBtn = ({ setCurrentPage, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2 bg-zinc-950 text-white hover:bg-brand border border-zinc-950 hover:border-brand font-bold px-5 py-3 text-[10px] tracking-widest uppercase transition-all duration-200 select-none btn-tactile cursor-pointer rounded-none"
      onClick={() => {
        setCurrentPage((prev) => prev + 1);
      }}
    >
      <span>Next</span>
      <FiArrowRight className="w-3.5 h-3.5" />
    </button>
  );
};

export default NextBtn;
