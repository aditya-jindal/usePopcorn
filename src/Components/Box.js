import { useState } from "react";

export function Box({ children }) {
  const [showContent, setShowContent] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setShowContent((val) => !val)}
      >
        {showContent ? "-" : "+"}
      </button>
      {showContent ? children : null}
    </div>
  );
}
