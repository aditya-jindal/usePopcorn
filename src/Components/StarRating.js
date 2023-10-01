import { useState } from "react";

export function StarRating({ maxRating = 5, color = "yellow", onSetRating }) {
  const starContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  };
  const starStyle = { width: "24px", height: "auto", cursor: "pointer" };
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [hover, setHover] = useState(false);
  return (
    <div style={starContainer} >
      <div style={{ marginRight: "10px" }}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            starStyle={starStyle}
            color={color}
            onClick={() => {
              setRating(i + 1);
              onSetRating(i + 1);
            }}
            key={i + 1}
            fill={i + 1 <= (hover ? tempRating : rating)}
            hover={hover}
            onHover={() => {
              setHover(true);
              setTempRating(i + 1);
            }}
            onMouseLeave={() => setHover(false)}
          />
        ))}
      </div>
      <div
        style={{
          visibility: `${hover ? "visible" : rating ? "visible" : "hidden"}`,
        }}
      >
        {hover ? tempRating : rating}
      </div>
    </div>
  );
}

function Star({
  starStyle,
  color,
  onClick,
  fill,
  hover,
  onHover,
  onMouseLeave,
}) {
  return (
    <>
      <svg
        style={starStyle}
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onMouseLeave}
        xmlns="http://www.w3.org/2000/svg"
        fill={fill ? color : "none"}
        viewBox="0 0 24 24"
        stroke={color}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </>
  );
}
