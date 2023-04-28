import React, { useState, useEffect } from "react";
import "./main.css";
import pathIconX from "../../Icon/icon-x.png";
import pathIconStar from "../../Icon/icon-star.png";
import pathIconSword from "../../Icon/icon-sword.png";
import pathIconGold from "../../Icon/icon-gold.png";
import pathIconD from "../../Icon/icon-d.png";
import pathIconBox from "../../Icon/icon-box.png";
import pathIconBitcoin from "../../Icon/icon-bitcoin.png";
import pathIconBow from "../../Icon/icon-bow.png";
import pathIconQuestion from "../../Icon/icon-question.png";

const initialArrayCards = [
  { id: 1, img: pathIconX },
  { id: 2, img: pathIconStar },
  { id: 3, img: pathIconSword },
  { id: 4, img: pathIconGold },
  { id: 5, img: pathIconD },
  { id: 6, img: pathIconBox },
  { id: 7, img: pathIconBitcoin },
  { id: 8, img: pathIconBow },
];

const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards];

function Main() {
  const [arrayCards, setArrayCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [matched, setMathed] = useState([]);
  const [moves, setMoves] = useState(0);

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  useEffect(() => {
    setArrayCards(shuffle(pairOfArrayCards));
  }, []);

  const flipCard = (index) => () => {
    setOpenedCards((opened) => [...opened, index]);
    setMoves((prevMove) => prevMove + 1);
  };

  useEffect(() => {
    if (openedCards < 2) return;
    const firstMatched = arrayCards[openedCards[0]];
    const secondMatched = arrayCards[openedCards[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMathed([...matched, firstMatched.id]);
    }

    if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000);
  }, [openedCards]);

  const handleGameRestart = () => {
    setOpenedCards([]);
    setMathed([]);
    setMoves(0);
    setArrayCards(shuffle(pairOfArrayCards));
  };

  return (
    <div className="container">
      <p className="number_of_strokes">Сделано ходов: {moves}</p>
      <div className="cards">
        {arrayCards.map((item, index) => {
          let isFlipped = false;

          if (openedCards.includes(index)) isFlipped = true;
          if (matched.includes(item.id)) isFlipped = true;

          return (
            <div
              key={index}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img src={item.img} width="100" alt="front-card" />
                </div>
                <div className="back">
                  <img src={pathIconQuestion} width="100" alt="question mark" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="button_restart" onClick={handleGameRestart}>
        Начать заново
      </button>
    </div>
  );
}

export default Main;
