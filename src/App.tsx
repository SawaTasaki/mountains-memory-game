import { useEffect, useState } from "react";
import getMountains from "./db/supabaseClient";
import Card from "./components/Card";
import { Mountain } from "./Propses";
import "./css/App.css";

function App() {
  const [mountains, setMountains] = useState<Mountain[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isFast, setIsFast] = useState<boolean>(false);
  const [times, setTimes] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const fetchMountains = async () => {
      const data = await getMountains();
      if (data) {
        setMountains(data);
      }
    };
    fetchMountains();
  }, []);

  const checkMatch = (newFlippedCards: number[]) => {
    const [theFirstCardId, theSecondCardId] = newFlippedCards;
    const theFirstCard = mountains.find(
      (mountain) => mountain.id === theFirstCardId,
    );
    const theSecondCard = mountains.find(
      (mountain) => mountain.id === theSecondCardId,
    );
    console.log(
      "App.tsx - checkMatch - １枚目のカード：",
      theFirstCard,
      "App.tsx - checkMatch - ２枚目のカード：",
      theSecondCard,
    );

    if (
      theFirstCard &&
      theSecondCard &&
      theFirstCardId !== theSecondCardId &&
      theFirstCard["都道府県"] === theSecondCard["都道府県"]
    ) {
      const newMatchedCards = [
        ...matchedCards,
        theFirstCardId,
        theSecondCardId,
      ];
      console.log("App.tsx - checkMatch - そろいました！", newMatchedCards);
      setIsFast(true);
      return newMatchedCards;
    } else {
      const newMatchedCards = [...matchedCards];
      console.log("App.tsx - checkMatch - そろいませんでした！", newMatchedCards);
      return newMatchedCards;
    }
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.includes(id) || matchedCards.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 1) {
      console.log(
        "App.tsx - handleCardClick - カードが１枚フリップされました。: ",
        newFlippedCards,
      );
    } else if (newFlippedCards.length === 2) {
      console.log(
        "App.tsx - handleCardClick - カードが２枚フリップされました。: ",
        newFlippedCards,
      );
      const newMatchedCards: number[] = checkMatch(newFlippedCards);
      setMatchedCards(newMatchedCards);
      setTimes(times + 1);
      if (newMatchedCards.length === mountains.length) {
        setIsFinished(true);
      }
    } else {
      console.log(
        "エラーかもしれません。",
        newFlippedCards.length,
        "枚のカードがフリップされている状態です。",
      );
      setFlippedCards([]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      if (isFast) {
        setIsFast(false);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 2500);
      }
    }
  }, [flippedCards, isFast]);

  return (
    <>
    {isFinished && <h1 className="text-center font-bold">ゲームは終了です。お疲れ様でした。</h1>}
    <h1 className="text-center font-bold">あなたは{times}回カードをフリップしました。</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mountains.map((mountain) => (
        <Card
          key={mountain["id"]}
          id={mountain["id"]}
          KanjiName={mountain["漢字山名"]}
          HiraganaName={mountain["ひらがな山名"]}
          prefecture={mountain["都道府県"]}
          matched={matchedCards.includes(mountain["id"])}
          flipped={flippedCards.includes(mountain["id"]) || matchedCards.includes(mountain["id"])}
          disabled={flippedCards.length >= 2}
          onClick={handleCardClick}
        />
      ))}
    </div>
    </>
  );
}

export default App;
