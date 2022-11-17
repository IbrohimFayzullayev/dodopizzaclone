import axios from "axios";
import React, { useState } from "react";
import "./sass/header.scss";
import { RotatingLines } from "react-loader-spinner";

const Header = () => {
  const [loginVisibe, setLoginVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [sendCode, setSendCode] = useState(0);
  const [stepNumber, setStepNumber] = useState(1);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidCode(number) {
    return number === 6 ? true : false;
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleNumber = (event) => {
    setSendCode(event.target.value);
  };
  const sendEmail = async () => {
    setSpinner(true);
    setStepNumber(0);
    const response = await axios.post(
      `http://13.40.130.53/signup`,
      {
        email: `${message}`,
      }
      // {
      //   withCredentials: true,
      // }
    );
    console.log(response);
    setSpinner(false);
    setStepNumber(2);
  };
  const checkCode = async () => {
    setSpinner(true);
    setStepNumber(0);
    const response = await axios.post(`http://13.40.130.53/verify`, {
      code: `${sendCode}`,
    });
    setSpinner(false);
    console.log(response);
  };

  return (
    <div className="header">
      <div className="logo">
        <h2 className="logo__name">ДОДОПИЦЦА</h2>
      </div>
      <div className="left__bar">
        <button
          className="login"
          onClick={() => {
            setLoginVisible(true);
          }}
        >
          Войти
        </button>
        <div
          className={`form__enter ${loginVisibe ? "show__form" : ""}`}
          onClick={() => {
            setLoginVisible(false);
          }}
        >
          <div
            className="form__number"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <i
              className="bi bi-x-lg close__login"
              onClick={() => {
                setLoginVisible(false);
              }}
            ></i>
            <h3 className="form__title">Вход на сайт</h3>
            <div className="form__text">
              {stepNumber === 1 ? (
                <>
                  Подарим подарок на день рождения, сохраним адрес доставки и
                  расскажем об акциях
                </>
              ) : stepNumber === 2 ? (
                <>
                  Код отправили сообщением на <br />
                  <p className="email__name">Email: {message}</p>
                  Agar xabar bormasa spam listingizni tekshiring
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="spinner__waiting">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={spinner}
              />
            </div>

            <form
              className={`lg__form ${stepNumber === 1 ? "" : "hide__form"}`}
            >
              <div className="email__input">
                <label htmlFor="user" className="form__label">
                  Email
                </label>
                <input
                  className="form__input"
                  type="email"
                  name="user"
                  id="user"
                  value={message}
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                disabled={isValidEmail(message) ? false : true}
                className={`send__btn ${
                  isValidEmail(message) ? "submit__btn" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  sendEmail();
                }}
              >
                Выслать код
              </button>
            </form>
            <form
              className={`lg__form ${stepNumber === 2 ? "" : "hide__form"}`}
            >
              <div className="email__input">
                <label htmlFor="code" className="form__label">
                  check code
                </label>
                <input
                  className="form__input"
                  type="number"
                  name="code"
                  id="code"
                  placeholder="123456"
                  onChange={handleNumber}
                />
              </div>
              <button
                type="submit"
                disabled={isValidCode(sendCode.length) ? false : true}
                className={`send__btn ${
                  isValidCode(sendCode.length) ? "submit__btn" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  checkCode();
                }}
              >
                Проверить код
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
