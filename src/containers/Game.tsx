import React from "react";
import GameBox from "../components/GameBox";

function Game() {
	let gameData = [
		{ letter: "A", value: 2 },
		{ letter: "B", value: 2 },
		{ letter: "C", value: 2 },
		{ letter: "D", value: 2 },
		{ letter: "A", value: 2 },
		{ letter: "B", value: 2 },
		{ letter: "C", value: 2 },
		{ letter: "D", value: 2 },
		{ letter: "A", value: 2 },
		{ letter: "B", value: 2 },
		{ letter: "C", value: 2 },
		{ letter: "D", value: 2 },
		{ letter: "A", value: 2 },
		{ letter: "B", value: 2 },
		{ letter: "C", value: 2 },
		{ letter: "D", value: 2 },
	];
	return (
		<div className="grid grid-cols-4 gap-1">
			{gameData.map((data, index) => {
				return <GameBox key={index} {...data} />;
			})}
		</div>
	);
}

export default Game;
