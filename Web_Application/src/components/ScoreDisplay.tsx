import React from "react";
import { ScoreProps } from "../assets/data/Types";
import CountDown from "./CountDown";

function ScoreDisplay(props: ScoreProps) {
  return (
    <div className="h-8 sm:mt-8 w-full mb-5 flex items-center">
      <div className="w-1/2 p-4  flex flex-col items-center">
        <CountDown />
        <div className="text-slate-300 text-lg flex items-center">
          Score: <span className="text-2xl text-white pl-1">{props.score}</span>
        </div>
      </div>
      <div className="w-1/2 p-4  flex flex-col">
        <div className="flex justify-center mb-1">
          <span className="text-slate-300 text-lg"> Found: </span>
          <span className="text-xl text-white px-1">{props.foundWords}</span>
          <span className="text-slate-200 text-lg">/{props.totalWords}</span>
        </div>
        {props.word != "" ? (
          <div className="bg-white px-2">
            <span className="tracking-widest text-lg">{props.word}</span>
          </div>
        ) : (
          <div className="h-7"></div>
        )}
      </div>
    </div>
  );
}

export default ScoreDisplay;
