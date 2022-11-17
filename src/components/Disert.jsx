import React, { useEffect, useState } from "react";
import { IMG_URL } from "../URL";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./sass/items.scss";
import axios from "axios";

const Disert = () => {
  const [disertList, setDisertList] = useState([]);
  const [clickedId, setClickedId] = useState(0);
  const [clickInfo, setClickInfo] = useState(false);

  useEffect(() => {
    const data = async () => {
      const data = await axios.get(`http://13.40.130.53/api/v1/vkusi`, {
        params: { turi: "disert" },
      });
      setDisertList(data.data.data);
    };
    data();
  }, []);
  return (
    <div className="items">
      <h2 className="title">Десерты</h2>
      <div className="items__list">
        {disertList.map((element) => {
          return (
            <div key={element.id}>
              <div
                className="items__list--item"
                onClick={() => {
                  setClickedId(element.id);
                }}
              >
                <div className="item__img">
                  <img src={`${IMG_URL}/${element.image}`} alt="" />
                  <h3 className="item__title">{element.name}</h3>
                  <p className="item__text box__text">{element.description}</p>
                </div>
                <div className="item__footer">
                  <p className="item__price">{element.price}</p>
                  <button
                    className="btn select__btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    В корзину
                  </button>
                </div>
              </div>
              <div
                className={`item__modal ${
                  clickedId === element.id ? "show__item" : ""
                }`}
                onClick={() => {
                  setClickedId(0);
                  setClickInfo(false);
                }}
              >
                <div
                  className="item__info"
                  onClick={(e) => {
                    e.stopPropagation();
                    setClickInfo(false);
                  }}
                >
                  <i
                    className="bi bi-x-lg close__icon"
                    onClick={() => {
                      setClickedId(0);
                    }}
                  ></i>
                  <div className="item__info--img">
                    <img src={`${IMG_URL}/${element.image}`} alt="" />
                  </div>
                  <div className="item__info--box">
                    <div className="item__info--top">
                      <div className="heroo">
                        <h3 className="heroo__title">{element.name}</h3>
                        <i
                          className="icon__info"
                          onClick={(e) => {
                            e.stopPropagation();
                            setClickInfo(clickInfo ? false : true);
                          }}
                        >
                          <AiOutlineInfoCircle />
                        </i>
                        <div
                          className={`info__modal ${
                            clickInfo ? "show__infomodal" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {element.kaloriya}
                        </div>
                      </div>
                      <p className="item__count">1 шт</p>
                      <p className="small__text">{element.description}</p>
                    </div>
                    <div className="item__info--footer">
                      <button className="btn btn__cart">
                        Добавить в корзину за {element.price}
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

export default Disert;
