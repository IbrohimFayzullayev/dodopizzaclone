import React from "react";
import "./sass/cart.scss";

const Cart = (props) => {
  return (
    <div
      className="cart"
      onClick={() => {
        props.setCartVisible(false);
      }}
    >
      <div
        className="cart__modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <i
          className="bi bi-x-lg cl__icon"
          onClick={() => {
            props.setCartVisible(false);
          }}
        ></i>
        <div className="empty__cart">
          <img
            src="https://cdn.dodostatic.net/site-static/dist/121df529925b0f43cc73.svg"
            alt=""
          />
          <h3 className="empty__cart--hero">Ой, пусто!</h3>
          <p className="empty__cart--text">
            Ваша корзина пуста, откройте «Меню» <br /> и выберите понравившийся
            товар.
            <br /> Мы доставим ваш заказ от 45 000 сум
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
