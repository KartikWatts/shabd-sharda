import React from "react";
import { WordProps } from "../assets/data/Types";

const WordDisplay = (props: WordProps) => {
  return (
    <div className="w-88 sm:w-128 p-5">
      <span className="text-amber-500 text-base sm:text-lg">
        Words Found{" "}
        <span className="text-amber-300 text-md">
          ({props.foundWords.length})
        </span>
      </span>
      <div
        id="found-words-list"
        className="w-full h-32 sm:h-40 p-2 sm:p-4 border-2 scroll-smooth overflow-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-slate-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-sm"
      >
        {props.foundWords.map((word, index) => {
          return (
            <span
              key={index}
              className="text-sm sm:text-base text-amber-300 mr-6 sm:mr-10 mb-1 sm:mb-2 inline-block"
            >
              {word.value}
              <span className="text-amber-500 ml-1">-{word.score}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordDisplay;
