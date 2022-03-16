import React from "react";
import { WordProps } from "../assets/data/Types";
import CountDown from "./CountDown";

function WordDisplay(props: WordProps) {
	return (
		<div className="h-2 w-full mb-5 flex items-center">
			<div className="w-1/2 p-4  flex flex-col">
				<CountDown />
				<div className="text-slate-300 text-lg flex items-center">
					Score:{" "}
					<span className="text-2xl text-white pl-1">
						{props.score}
					</span>
				</div>
			</div>
			<div className="w-1/2 p-4  flex flex-col">
				<div className="flex items-center">
					<span className="text-slate-300 text-lg"> Found: </span>
					<span className="text-xl text-white px-1">
						{props.foundWords}
					</span>
					<span className="text-slate-200 text-lg">
						/{props.totalWords}
					</span>
				</div>
				{props.word != "" ? (
					<div className="bg-white px-2">
						<span className="tracking-widest text-lg">
							{props.word}
						</span>
					</div>
				) : (
					<div className="h-7"></div>
				)}
			</div>
		</div>
	);
}

export default WordDisplay;
