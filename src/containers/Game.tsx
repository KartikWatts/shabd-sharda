import React, { useState } from "react";
import GameBox from "../components/GameBox";
import WordDisplay from "../components/WordDisplay";

function Game() {
	interface Data {
		id: number;
		letter: string;
		value: number;
		isIncluded: boolean;
	}

	let originalData: Data[] = [
		{ id: 0, letter: "A", value: 2, isIncluded: false },
		{ id: 1, letter: "B", value: 2, isIncluded: false },
		{ id: 2, letter: "C", value: 2, isIncluded: false },
		{ id: 3, letter: "D", value: 2, isIncluded: false },
		{ id: 4, letter: "A", value: 2, isIncluded: false },
		{ id: 5, letter: "B", value: 2, isIncluded: false },
		{ id: 6, letter: "C", value: 2, isIncluded: false },
		{ id: 7, letter: "D", value: 2, isIncluded: false },
		{ id: 8, letter: "A", value: 2, isIncluded: false },
		{ id: 9, letter: "B", value: 2, isIncluded: false },
		{ id: 10, letter: "C", value: 2, isIncluded: false },
		{ id: 11, letter: "D", value: 2, isIncluded: false },
		{ id: 12, letter: "A", value: 2, isIncluded: false },
		{ id: 13, letter: "B", value: 2, isIncluded: false },
		{ id: 14, letter: "C", value: 2, isIncluded: false },
		{ id: 15, letter: "D", value: 2, isIncluded: false },
	];

	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
	const [currentWord, setCurrentWord] = useState<string>("");
	const [gameData, setGameData] = useState<Data[]>(originalData);

	document.addEventListener("mousedown", () => {
		setIsMouseDown(true);
	});
	document.addEventListener("mouseup", () => {
		setIsMouseDown(false);
	});

	const updateState = (id: number) => {
		let data = { ...gameData[id] };
		if (!data.isIncluded) {
			let newData = { ...gameData[id] };

			newData = {
				...gameData[data.id],
				isIncluded: true,
			};

			setGameData([
				...gameData.slice(0, data.id),
				newData,
				...gameData.slice(data.id + 1),
			]);
			let newWord = currentWord.concat(data.letter);
			setCurrentWord(newWord);
		}
	};

	const endWordAndReset = (data: Data) => {
		console.log(currentWord);
		let boxElements = document.querySelectorAll(".game-box");

		let boxElementsArray = Array.prototype.slice.call(boxElements);
		boxElementsArray.map((box) => {
			if (box.classList.contains("bg-teal-200")) {
				box.classList.remove("bg-teal-200");
				box.classList.add("hover:bg-violet-400");
			}
		});
		setCurrentWord("");
		setGameData(originalData);
	};

	return (
		<div className="flex justify-center items-center flex-col gap-5">
			<WordDisplay word={currentWord} />
			<div className="grid grid-cols-4 gap-1.5">
				{gameData.map((data) => {
					return (
						<GameBox
							key={data.id}
							endWord={() => {
								endWordAndReset(data);
							}}
							isMouseDown={isMouseDown}
							updateState={() => updateState(data.id)}
							{...data}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Game;
