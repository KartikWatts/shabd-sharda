import React from "react";
import { WordProps } from "../assets/data/Types";

function WordDisplay(props: WordProps) {
	return (
		<div className="h-2 w-full mb-4 flex items-center">
			<div className="w-1/4 text-slate-300 text-lg">
				Score: <span className="text-xl text-white">{props.score}</span>
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
