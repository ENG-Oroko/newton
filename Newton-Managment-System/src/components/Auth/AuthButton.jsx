import React from "react";

const AuthButton = ({ loading, text = "Submit" }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full p-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition disabled:opacity-60"
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default AuthButton;