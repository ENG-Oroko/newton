import React, { useState } from "react";

const PasswordField = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="w-full p-3 pr-14 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-400 outline-none text-white"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-cyan-300"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordField;