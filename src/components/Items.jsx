import React, { useEffect, useState } from "react";
import getData from "../getData";
import "./sass/items.scss";

const Items = (props) => {
  const [zakuskiList, setZakuskiList] = useState([]);
  const [disertList, setDisertList] = useState([]);

  useEffect(() => {
    const data = async () => {
      // const d = await getData(props.type);
      // console.log(d, props.type);
    };
    data();
  }, []);
  return (
    <div className="item__box">
      <h2 className="title">
        {props.type === "zakuski"
          ? "Закуски"
          : props.type === "disert"
          ? "Десерты"
          : ""}
      </h2>
      <div className="items__list"></div>
    </div>
  );
};

export default Items;
