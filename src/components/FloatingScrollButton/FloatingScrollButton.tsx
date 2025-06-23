import React, { useState, useEffect } from "react";

const FloatingScrollButton: React.FC = () => {
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);

  useEffect(() => {
    const checkScrollHeight = (): void => {
      const scrollTriggerPoint = 520;
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;

      setShouldDisplay(currentScrollY > scrollTriggerPoint);
    };

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  const handleScrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyleClasses = `back-to-top-btn ${
    shouldDisplay ? "back-to-top-visible" : ""
  }`;

  return (
    <button
      onClick={handleScrollToTop}
      className={buttonStyleClasses}
      aria-label="Вернуться в начало страницы"
      style={{
        position: "fixed",
        bottom: "21px",
        right: "21px",
        display: shouldDisplay ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        backgroundColor: "var(--primary-color)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 3px 6px rgba(0,0,0,0.18)",
        zIndex: 100,
        opacity: 0.85,
        transition: "opacity 0.28s ease",
      }}
      onMouseOver={(e: React.MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.style.opacity = "1";
      }}
      onMouseOut={(e: React.MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.style.opacity = "0.85";
      }}
    >
      ↑
    </button>
  );
};

export default React.memo(FloatingScrollButton);
