import React from "react";
import { WordProps } from "../assets/data/Types";
import CountDown from "./CountDown";

function WordDisplay(props: WordProps) {
	return (
		<div className="h-2 w-full mb-4 flex items-center">
			<div className="w-1/2 p-4  flex flex-col">
				<CountDown />
				<div className="text-slate-300 text-lg flex content-center">
					Score:{" "}
					<span className="text-2xl text-white pl-1">
						{props.score}
					</span>
				</div>
			</div>
			{props.word != "" && (
				<div className="bg-white px-2">
					<span className="tracking-widest text-lg">
						{props.word}
					</span>
				</div>
			)}
		</div>
	);
}

export default WordDisplay;
