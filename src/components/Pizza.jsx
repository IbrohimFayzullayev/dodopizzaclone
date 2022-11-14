import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sass/pizza.scss";
import "rodal/lib/rodal.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { URL } from "../URL";

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [checkedRadius, setCheckedRadius] = useState("2");
  const [checkWeight, setCheckWeight] = useState(2);
  const [checkedItems, setCheckedItems] = useState([]);
  const [vkusPrice, setVkusPrice] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const pizzas = await axios.get(`${URL}/pizza`);
      console.log(pizzas.data.data);
      let asa = pizzas.data.data.map((val, index) => {
        return {
          id: index + 1,
          ...val,
        };
      });
      console.log(asa);
      setPizzas(asa);
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
  const closeModal = () => {
    setCheckedRadius("2");
    setCheckWeight(2);
    setInfoVisible(false);
    setClickedItemId(0);
    setCheckedItems([]);
    setVkusPrice(0);
  };

  return (
    <div className="pizza">
      <h2 className="title">Пицца</h2>
      <div className="pizza__list">
        {pizzas?.map((item) => {
          return (
            <div key={item.id}>
              <div
                className="pizza__list--item"
                onClick={() => {
                  setClickedItemId(item.id);
                }}
              >
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
              <div
                className={`rodall ${
                  clickedItemId === item.id ? "show__modal" : ""
                }`}
                onClick={() => {
                  closeModal();
                }}
              >
                <div
                  className={`pizza__box`}
                  onClick={(e) => {
                    setInfoVisible(false);
                    e.stopPropagation();
                  }}
                >
                  <i
                    className="bi bi-x-lg close__icon"
                    onClick={() => {
                      closeModal();
                    }}
                  ></i>
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
                          onClick={(e) => {
                            e.stopPropagation();
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <p className="pzinfo__title">
                          Пищевая ценность на 100 г
                        </p>
                        <div className="pzinfo__textbox">
                          {item.pizza.kkal?.split("\n").map((val, index) => {
                            return (
                              <div key={index} className="pzinfo__item">
                                <p>{val}</p>
                                {val === "Вес" ? (
                                  <p>
                                    {clickedItemId === item.id
                                      ? item.pizza.massa[
                                          Number(checkedRadius) - 1
                                        ][Number(checkWeight) - 1]
                                      : ""}
                                    г
                                  </p>
                                ) : val === "Диаметр" ? (
                                  <p>
                                    {clickedItemId === item.id
                                      ? item.pizza.radius[
                                          Number(checkedRadius) - 1
                                        ]
                                      : ""}{" "}
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
                        {clickedItemId === item.id
                          ? item.pizza.radius[Number(checkedRadius) - 1]
                          : ""}{" "}
                        см, традиционное тесто,
                        {clickedItemId === item.id
                          ? item.pizza.massa[Number(checkedRadius) - 1][
                              Number(checkWeight) - 1
                            ]
                          : ""}{" "}
                        г
                      </p>
                      <p className="small__text">{item.pizza.description}</p>
                      <div className="select__box">
                        <div className="radius__select">
                          <input
                            className={`radius__input ${
                              clickedItemId === item.id
                                ? `ishladi ${clickedItemId + " " + item.id}`
                                : `noooo ${clickedItemId + " " + item.id}`
                            }`}
                            type="radio"
                            name="radius"
                            id="small_radius"
                            value={1}
                            onChange={(e) => {
                              setCheckedRadius(e.target.value);
                            }}
                            disabled={
                              clickedItemId
                                ? pizzas[clickedItemId - 1].pizza.radius
                                    .length < 1
                                  ? true
                                  : false
                                : false
                            }
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
                            className={`radius__input ${
                              clickedItemId === item.id
                                ? `ishladi ${clickedItemId + " " + item.id}`
                                : `noooo ${clickedItemId + " " + item.id}`
                            }`}
                            type="radio"
                            name="radius"
                            id="medium_radius"
                            value={2}
                            onChange={(e) => {
                              setCheckedRadius(e.target.value);
                            }}
                            disabled={
                              clickedItemId
                                ? pizzas[clickedItemId - 1].pizza.radius
                                    .length < 2
                                  ? true
                                  : false
                                : false
                            }
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
                            className={`radius__input ${
                              clickedItemId === item.id
                                ? `ishladi ${clickedItemId + " " + item.id}`
                                : `noooo ${clickedItemId + " " + item.id}`
                            }`}
                            type="radio"
                            name="radius"
                            id="high_radius"
                            value={3}
                            onChange={(e) => {
                              setCheckedRadius(e.target.value);
                            }}
                            disabled={
                              clickedItemId
                                ? pizzas[clickedItemId - 1].pizza.radius
                                    .length < 3
                                  ? true
                                  : false
                                : false
                            }
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
                        <h3 className="vkus__title">
                          {item.vkusi.length !== 0 ? `Добавьте по вкусу` : ""}
                        </h3>
                        <div className="vkus__list">
                          {item.vkusi?.map((vkuss) => {
                            return (
                              <div
                                key={vkuss.id}
                                className={`vkus__item ${
                                  checkedItems.includes(vkuss.id)
                                    ? "vkus__cliked"
                                    : ""
                                }`}
                                onClick={() => {
                                  clickItem(vkuss);
                                }}
                              >
                                <i className="bi bi-check-circle checked__icon"></i>
                                <div className="vkus__item--img">
                                  <img
                                    src={`http://13.40.130.53/images/${vkuss.image}`}
                                    alt=""
                                  />
                                </div>
                                <p className="vkus__item--title">
                                  {String(vkuss.name).slice(0, 20)}
                                </p>
                                <p className="vkus__item--price">
                                  {vkuss.price} сум
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pizza;
