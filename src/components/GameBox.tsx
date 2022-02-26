import React from "react";

type DataProps = {
	letter: string;
	value: number;
};

function GameBox(props: DataProps) {
	return (
		<div
			className={
				"w-20 h-20 sm:w-28 sm:h-28 bg-blue-400 rounded-md drop-shadow-md flex justify-center items-center text-3xl sm:text-5xl select-none hover:bg-violet-400 delay-100"
			}
		>
			<span className="absolute top-0 left-1 sm:top-1 sm:left-1 text-base sm:text-2xl">
				{props.value}
			</span>
			{props.letter}
		</div>
	);
}

export default GameBox;
