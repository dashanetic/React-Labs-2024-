import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";

const MenuPage: React.FC = () => {
  useEffect(() => {
    document.title = "Food Delivery Service";

    detectViewportSize();
    window.addEventListener("resize", detectViewportSize);

    return () => {
      window.removeEventListener("resize", detectViewportSize);
    };
  }, []);

  const detectViewportSize = (): void => {
    const isMobileDevice = window.innerWidth <= 767;
    const pageWrapper = document.querySelector(".dining-container");

    if (pageWrapper) {
      pageWrapper.classList.toggle("mobile-view", isMobileDevice);
    }
  };

  return (
    <Fragment>
      <div className="dining-container">
        <Header />
        <main className="container">
          <Menu />
        </main>
        <Footer />
      </div>

      <FloatingScrollButton />
    </Fragment>
  );
};

interface ButtonStyles {
  position: "fixed";
  bottom: string;
  right: string;
  display: "flex" | "none";
  justifyContent: "center";
  alignItems: "center";
  width: string;
  height: string;
  borderRadius: string;
  backgroundColor: string;
  color: string;
  border: string;
  cursor: "pointer";
  boxShadow: string;
  zIndex: number;
  opacity: number;
  transition: string;
}

const FloatingScrollButton: React.FC = () => {
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  const checkScrollHeight = (): void => {
    const scrollTriggerPoint = 520;
    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;

    setShouldDisplay(currentScrollY > scrollTriggerPoint);
  };

  const handleScrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyleClasses = `back-to-top-btn ${
    shouldDisplay ? "back-to-top-visible" : ""
  }`;

  const buttonStyles: ButtonStyles = {
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
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.opacity = "1";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.opacity = "0.85";
  };

  return (
    <button
      onClick={handleScrollToTop}
      className={buttonStyleClasses}
      aria-label="Вернуться в начало страницы"
      style={buttonStyles}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      ↑
    </button>
  );
};

export default MenuPage;