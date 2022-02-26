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

	const formWord = (data: Data) => {
		let currentBox: HTMLElement | null = document.getElementById(
			`${data.id}`
		);
		let newData = { ...gameData[data.id] };

		if (!data.isIncluded && currentBox) {
			currentBox.addEventListener("mousemove", (event) => {
				if (currentBox) {
					// CHECK IF LOCATION OF MOUSE POINTER IS WITHIN 25% to 75% VERTICALLY AND HORIZONTALLY
					let boxX = currentBox.offsetWidth;
					let boxY = currentBox.offsetHeight;

					let mouseX = event.clientX - currentBox.offsetLeft,
						mouseY = event.clientY - currentBox.offsetTop;

					if (
						mouseX > boxX / 4 &&
						mouseX < (3 * boxX) / 4 &&
						mouseY > boxY / 4 &&
						mouseY < (3 * boxY) / 4
					) {
						newData = { ...gameData[data.id], isIncluded: true };

						setGameData([
							...gameData.slice(0, data.id),
							newData,
							...gameData.slice(data.id + 1),
						]);
						let newWord = currentWord.concat(data.letter);
						setCurrentWord(newWord);
						currentBox.classList.remove("hover:bg-violet-400");
						currentBox.classList.add("bg-teal-200");
					}
				}
			});
		}
	};

	const endWordAndReset = (data: Data) => {
		console.log(currentWord);
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
							startWord={() => {
								currentWord == "" && formWord(data);
							}}
							touchBox={() => {
								isMouseDown && formWord(data);
							}}
							endWord={() => {
								endWordAndReset(data);
							}}
							{...data}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Game;
