const Decoration = () => {
  return (
    <div style={{ pointerEvents: "none" }}>
      <span className="absolute top-0 left-0 z-[-1]">
        <svg
          width="189"
          height="162"
          viewBox="0 0 189 162"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="16"
            cy="-16.5"
            rx="173"
            ry="178.5"
            transform="rotate(180 16 -16.5)"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-157"
              y1="-107.754"
              x2="98.5011"
              y2="-106.425"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.07" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="191"
          height="208"
          viewBox="0 0 191 208"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="173"
            cy="178.5"
            rx="173"
            ry="178.5"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-3.27832e-05"
              y1="87.2457"
              x2="255.501"
              y2="88.5747"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </div>
  );
};

export default Decoration;
