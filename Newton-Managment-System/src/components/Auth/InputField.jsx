import React from "react";

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-400 outline-none text-white"
    />
  );
};

export default InputField;