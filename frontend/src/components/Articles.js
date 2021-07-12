
// import React, { useState } from 'react';
import Article from "./Article";

const Data = require("../service/data");


const Articles = () => {
  // const [data,setData]=useState("hello")

  // console.log( Data);
  return (
    <div className="articles">   
      <ul>
                <li><Article /></li>
                <li><Article /></li>
                <li><Article /></li>
                <li><Article /></li>
                <li><Article /></li>
            </ul>
    </div>
  );
};

export default Articles;
