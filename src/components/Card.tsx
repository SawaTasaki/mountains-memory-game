import React from 'react';
import { CardProps } from '../Propses';
import '../css/App.css';

const Card: React.FC<CardProps> = ({ id, KanjiName, HiraganaName, prefecture, matched, flipped, disabled, onClick }) => {
    
    function handleClick(id: number) {
        if (matched || flipped || disabled) return;
        onClick(id);
    }

    return (
    <div
    onClick={() => {handleClick(id);}}
    className={`max-w-sm h-[15vh] rounded shadow-lg bg-green-300 p-6 card ${flipped ? "flipped" : ""} ${matched ? "matched" : ""}`}
    >
    {flipped ? (
        <>
        <p className="text-xl font-bold flex items-center justify-center transform scale-x-[-1]">{KanjiName}</p>
        <p className="text-sm flex items-center justify-center transform scale-x-[-1]">({HiraganaName})</p>
        <p className="text-sm flex items-center justify-center transform scale-x-[-1]">{prefecture}</p>
        </>
    ) : matched ? (
        <>
        <p className="text-xl font-bold flex items-center justify-center">{KanjiName}</p>
        <p className="text-sm flex items-center justify-center">({HiraganaName})</p>
        <p className="text-sm flex items-center justify-center">{prefecture}</p>
        </>
    ) : (
        <>
        <p className="text-xl font-bold flex items-center justify-center">{KanjiName}</p>
        <p className="text-sm flex items-center justify-center">({HiraganaName})</p>
        </>
    )}
    </div>  
    );
};

export default Card;
