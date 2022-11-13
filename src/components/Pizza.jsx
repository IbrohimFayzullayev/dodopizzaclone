import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import axios from "axios";
import "./sass/pizza.scss";
import "rodal/lib/rodal.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { URL } from "../URL";

const Pizza = () => {
  const [visible, setVisible] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [checkedRadius, setCheckedRadius] = useState("2");
  const [checkWeight, setCheckWeight] = useState(2);
  const [checkedItems, setCheckedItems] = useState([]);
  const [vkusPrice, setVkusPrice] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  useEffect(() => {
    const getData = async () => {
      const pizzas = await axios.get(`${URL}/pizza`);
      console.log(pizzas);
      setPizzas(pizzas.data.data);
    };
    getData();
  }, []);

  const clickItem = (item) => {
    if (checkedItems.includes(item.id)) {
      let arr = checkedItems.filter((id) => id !== item.id);
      setCheckedItems(arr);
      setVkusPrice(vkusPrice - item.price);
    } else {
      let arr = [item.id, ...checkedItems];
      setCheckedItems(arr);
      setVkusPrice(vkusPrice + item.price);
    }
  };

  return (
    <div className="pizza">
      <h2 className="title">Пицца</h2>
      <div className="pizza__list">
        {pizzas?.map((item) => {
          return (
            <div key={item.pizza.id}>
              <div className="pizza__list--item" onClick={show}>
                <img
                  src={`http://13.40.130.53/images/${item.pizza.mainImage}`}
                  alt="pizza"
                />
                <h3 className="box__title">{item.pizza.name}</h3>
                <p className="box__text">{item.pizza.description}</p>
                <div className="price">
                  <p className="price__sum">от {item.pizza.price[0]} сум</p>
                  <button className="select__btn btn">Выбрать</button>
                </div>
              </div>
              <Rodal
                className="rodall"
                width={924}
                height={600}
                visible={visible}
                onClose={hide}
              >
                <div className="pizza__box">
                  <div className="pizza__img">
                    <img
                      src={`http://13.40.130.53/images/${item.pizza.images[0]}`}
                      alt=""
                      style={{
                        width: `${
                          checkedRadius === "1"
                            ? "350px"
                            : checkedRadius === "2"
                            ? "400px"
                            : "450px"
                        }`,
                        height: `${
                          checkedRadius === "1"
                            ? "350px"
                            : checkedRadius === "2"
                            ? "400px"
                            : "450px"
                        }`,
                      }}
                    />
                  </div>
                  <div className="pizza__info">
                    <div className="pizza__over">
                      <div className="heroo">
                        <p className="heroo__title">{item.pizza.name}</p>
                        <i
                          onClick={() => {
                            setInfoVisible(infoVisible ? false : true);
                          }}
                        >
                          <AiOutlineInfoCircle />
                        </i>
                      </div>
                      <div
                        className={`pzinfo ${
                          infoVisible ? "visible__info" : ""
                        }`}
                      >
                        <p className="pzinfo__title">
                          Пищевая ценность на 100 г
                        </p>
                        <div className="pzinfo__textbox">
                          {item.pizza.kkal.split("\n").map((val,index) => {
                            return (
                              <div key={index} className="pzinfo__item">
                                <p>{val}</p>
                                {val === "Вес" ? (
                                  <p>
                                    {
                                      item.pizza.massa[
                                        Number(checkedRadius) - 1
                                      ][checkWeight - 1]
                                    }{" "}
                                    г
                                  </p>
                                ) : val === "Диаметр" ? (
                                  <p>
                                    {
                                      item.pizza.radius[
                                        Number(checkedRadius) - 1
                                      ]
                                    }{" "}
                                    см
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <p className="box__text">
                        {item.pizza.radius[Number(checkedRadius) - 1]} см,
                        традиционное тесто,
                        {
                          item.pizza.massa[Number(checkedRadius) - 1][
                            checkWeight - 1
                          ]
                        }{" "}
                        г
                      </p>
                      <p className="small__text">{item.pizza.description}</p>
                      <div className="select__box">
                        <div className="radius__select">
                          <input
                            className={`radius__input`}
                            type="radio"
                            name="radius"
                            id="small_radius"
                            value={1}
                            onChange={(e) => {
                              setCheckedRadius(e.target.value);
                            }}
                          />
                          <label
                            className={`radius__label input__label ${
                              checkedRadius === "1" ? "checked__value" : ""
                            }`}
                            htmlFor="small_radius"
                          >
                            Маленькая
                          </label>
                          <input
                            className="radius__input"
                            type="radio"
                            name="radius"
                            id="medium_radius"
                            value={2}
                            onChange={(e) => {
                              setCheckedRadius(e.target.value);
                            }}
                          />
                          <label
                            className={`radius__label input__label ${
                              checkedRadius === "2" ? "checked__value" : ""
                            }`}
                            htmlFor="medium_radius"
                          >
                            Средняя
                          </label>
                          <input
                            className="radius__input"
                            type="radio"
                            name="radius"
                            id="high_radius"
                            value={3}
                            onChange={(e) => {
                              setCheckedRadius(e.target.value);
                            }}
                          />
                          <label
                            className={`radius__label input__label ${
                              checkedRadius === "3" ? "checked__value" : ""
                            }`}
                            htmlFor="high_radius"
                          >
                            Большая
                          </label>
                        </div>
                        <div className="radius__select">
                          <input
                            className={`radius__input`}
                            type="radio"
                            name="weight"
                            id="weight__large"
                            value={2}
                            onChange={(e) => {
                              setCheckWeight(Number(e.target.value));
                            }}
                          />
                          <label
                            className={`weight__label input__label ${
                              checkWeight === 2 ? "checked__value" : ""
                            }`}
                            htmlFor="weight__large"
                          >
                            Традиционное
                          </label>
                          <input
                            className="radius__input"
                            type="radio"
                            name="weight"
                            id="weight__small"
                            value={1}
                            onChange={(e) => {
                              setCheckWeight(Number(e.target.value));
                            }}
                          />
                          <label
                            className={`weight__label input__label ${
                              checkWeight === 1 ? "checked__value" : ""
                            }`}
                            htmlFor="weight__small"
                          >
                            Тонкое
                          </label>
                        </div>
                      </div>
                      <div className="vkus">
                        <h3 className="vkus__title">Добавьте по вкусу</h3>
                        <div className="vkus__list">
                          {item.vkusi.map((vkusi) => {
                            return (
                              <div
                                key={vkusi.id}
                                className={`vkus__item ${
                                  checkedItems.includes(vkusi.id)
                                    ? "vkus__cliked"
                                    : ""
                                }`}
                                onClick={() => {
                                  clickItem(vkusi);
                                }}
                              >
                                <i className="bi bi-check-circle checked__icon"></i>
                                <div className="vkus__item--img">
                                  <img
                                    src={`http://13.40.130.53/images/${vkusi.image}`}
                                    alt=""
                                  />
                                </div>
                                <p className="vkus__item--title">
                                  {String(vkusi.name).slice(0, 20)}
                                </p>
                                <p className="vkus__item--price">
                                  {vkusi.price} сум
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="add__tocart">
                      <button className="btn__cart btn">
                        Добавить в корзину за{" "}
                        {item.pizza.price[checkedRadius - 1] + vkusPrice} сум
                      </button>
                    </div>
                  </div>
                </div>
              </Rodal>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pizza;
