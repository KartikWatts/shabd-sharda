import React from "react";

type DataProps = {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	touchBox: () => void;
	startWord: () => void;
	endWord: () => void;
};

function GameBox(props: DataProps) {
	return (
		<div
			id={props.id.toString()}
			onMouseDown={props.startWord}
			onMouseOver={props.touchBox}
			onMouseUp={props.endWord}
			className={
				"transition duration-300 w-20 h-20 sm:w-28 sm:h-28 bg-blue-400 rounded-md drop-shadow-md flex justify-center items-center text-4xl sm:text-5xl select-none hover:bg-violet-400"
			}
		>
			<span className="absolute top-0 left-1 sm:top-0.5 sm:left-1 text-sm sm:text-xl">
				{props.value}
			</span>
			{props.letter}
		</div>
	);
}

export default GameBox;
