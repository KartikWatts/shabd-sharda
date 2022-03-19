import React from "react";
import { Data } from "../assets/data/Interfaces";
import { DataProps } from "../assets/data/Types";

function GameBoxDisplay(props: Data) {
	return (
		<div
			className={
				"game-box transition duration-300 w-10 h-10 sm:w-18 sm:h-18 bg-blue-400 rounded-sm sm:rounded-md drop-shadow-md flex justify-center items-center text-xl sm:text-4xl select-none hover:bg-violet-400"
			}
		>
			<span className="absolute top-0 left-1 sm:top-0.5 sm:left-1 text-xs sm:text-lg">
				{props.value}
			</span>
			{props.letter}
		</div>
	);
}

export default GameBoxDisplay;
