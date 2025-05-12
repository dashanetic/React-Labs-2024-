import { Component, Fragment } from "react";
import Header from "../components/Header/Header.jsx";
import Menu from "../components/Menu/Menu.jsx";
import Footer from "../components/Footer/Footer.jsx";

class MenuPage extends Component {
  componentDidMount() {
    document.title = "Food Delivery Service";

    this.detectViewportSize();
    window.addEventListener("resize", this.detectViewportSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.detectViewportSize);
  }

  detectViewportSize = () => {
    const isMobileDevice = window.innerWidth <= 767;
    const pageWrapper = document.querySelector(".dining-container");

    if (pageWrapper) {
      pageWrapper.classList.toggle("mobile-view", isMobileDevice);
    }
  };

  render() {
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
  }
}

class FloatingScrollButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldDisplay: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.checkScrollHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkScrollHeight);
  }

  checkScrollHeight = () => {
    const scrollTriggerPoint = 520;
    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;

    this.setState({ shouldDisplay: currentScrollY > scrollTriggerPoint });
  };

  handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    const { shouldDisplay } = this.state;
    const buttonStyleClasses = `back-to-top-btn ${
      shouldDisplay ? "back-to-top-visible" : ""
    }`;

    return (
      <button
        onClick={this.handleScrollToTop}
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
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = "0.85";
        }}
      >
        ↑
      </button>
    );
  }
}

export default MenuPage;
