import React from "react";

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-center mb-2">
        {title}
      </h2>

      <p className="text-center text-gray-400 text-sm mb-6">
        {subtitle}
      </p>

      {children}
    </div>
  );
};

export default AuthCard;