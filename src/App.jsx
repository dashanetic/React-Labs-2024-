import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MenuPage from "./components/MenuPage/MenuPage";
import "./App.css";

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <main className="content">
                <MenuPage />
            </main>
            <Footer />
        </div>
    );
};

export default App;
