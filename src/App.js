import React from "react";
import "./app.scss";
import Pizza from "./components/Pizza";
import Items from "./components/Items";

const App = () => {
  return (
    <div className="app">
      <div className="header container">Header</div>
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__list--item">Пицца</li>
          <li className="menu__list--item">Комбо</li>
          <li className="menu__list--item">Комбо</li>
          <li className="menu__list--item">Десерты</li>
          <li className="menu__list--item">Напитки</li>
          <li className="menu__list--item">Акции</li>
          <li className="menu__list--item">Контакты</li>
          <li className="menu__list--item">Франшиза</li>
          <li className="menu__list--item">О нас</li>
        </ul>
        <button className="btn__cart btn">Корзина</button>
      </div>
      <section className="accordion container"></section>
      <section className="section__pizza container">
        <Pizza />
      </section>
      <section className="section__zakuski container">
        <Items srt={"hello zakuski"} />
      </section>
      <section className="section__zakuski container">
        <Items srt={"hello disert"} />
      </section>
    </div>
  );
};

export default App;
