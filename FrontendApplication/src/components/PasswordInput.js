import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const PasswordInput = ({ value, onChange, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        {...props}
        style={{ paddingRight: "7.7rem" }} // space for the icon
      />
      <span
        onClick={() => setShow((e) => !e)}
        style={{
          position: "absolute",
          right: "0.7rem",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#888"
        }}
        tabIndex={0}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          // Eye open SVG
          <FaEye />
        ) : (
          // Eye closed SVG
          <FaEyeSlash />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;