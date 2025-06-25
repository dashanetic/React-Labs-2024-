import React, { Fragment, useEffect } from "react";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";
import FloatingScrollButton from "../components/FloatingScrollButton/FloatingScrollButton";

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

export default MenuPage;
