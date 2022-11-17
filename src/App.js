import React, { useState } from "react";
import "./app.scss";
import Pizza from "./components/Pizza";
import Disert from "./components/Disert";
import Zakuski from "./components/Zakuski";
import Cart from "./components/Cart";
import Header from "./components/Header";

const App = () => {
  const [cartVisible, setCartVisible] = useState(false);
  return (
    <div className="app">
      <div className="header__section container">
        <Header />
      </div>
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__list--item">Пицца</li>
          <li className="menu__list--item">Комбо</li>
          <li className="menu__list--item">Закуски</li>
          <li className="menu__list--item">Десерты</li>
          <li className="menu__list--item">Напитки</li>
          <li className="menu__list--item">Акции</li>
          <li className="menu__list--item">Контакты</li>
          <li className="menu__list--item">Франшиза</li>
          <li className="menu__list--item">О нас</li>
        </ul>
        <button
          className="btn__cart btn"
          onClick={() => {
            setCartVisible(true);
          }}
        >
          Корзина
        </button>
      </div>
      <div className={`cart__section ${cartVisible ? "show__cart" : ""}`}>
        <Cart setCartVisible={setCartVisible} />
      </div>
      <section className="accordion container"></section>
      <section className="section container">
        <Pizza />
      </section>
      <section className="section container">
        <Zakuski />
      </section>
      <section className="section container">
        <Disert />
      </section>
    </div>
  );
};

export default App;
