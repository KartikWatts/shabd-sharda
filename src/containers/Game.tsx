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

	interface WordsData {
		value: string;
		isIncluded: boolean;
	}

	let originalData: Data[] = [
		{ id: 0, letter: "C", value: 3, isIncluded: false },
		{ id: 1, letter: "S", value: 2, isIncluded: false },
		{ id: 2, letter: "E", value: 1, isIncluded: false },
		{ id: 3, letter: "T", value: 2, isIncluded: false },
		{ id: 4, letter: "W", value: 6, isIncluded: false },
		{ id: 5, letter: "A", value: 2, isIncluded: false },
		{ id: 6, letter: "N", value: 2, isIncluded: false },
		{ id: 7, letter: "A", value: 2, isIncluded: false },
		{ id: 8, letter: "O", value: 2, isIncluded: false },
		{ id: 9, letter: "M", value: 4, isIncluded: false },
		{ id: 10, letter: "O", value: 2, isIncluded: false },
		{ id: 11, letter: "E", value: 1, isIncluded: false },
		{ id: 12, letter: "D", value: 3, isIncluded: false },
		{ id: 13, letter: "E", value: 1, isIncluded: false },
		{ id: 14, letter: "R", value: 2, isIncluded: false },
		{ id: 15, letter: "G", value: 4, isIncluded: false },
	];

	let validWordsList: WordsData[] = [
		{ value: "TEN", isIncluded: false },
		{ value: "TENS", isIncluded: false },
		{ value: "TEA", isIncluded: false },
		{ value: "CAN", isIncluded: false },
		{ value: "CANE", isIncluded: false },
		{ value: "CANER", isIncluded: false },
		{ value: "CASE", isIncluded: false },
		{ value: "SANE", isIncluded: false },
		{ value: "WANT", isIncluded: false },
		{ value: "WANE", isIncluded: false },
		{ value: "WANES", isIncluded: false },
		{ value: "SET", isIncluded: false },
		{ value: "MAN", isIncluded: false },
		{ value: "MANE", isIncluded: false },
		{ value: "MANES", isIncluded: false },
		{ value: "MANS", isIncluded: false },
		{ value: "SENT", isIncluded: false },
		{ value: "TAN", isIncluded: false },
		{ value: "TANS", isIncluded: false },
		{ value: "MON", isIncluded: false },
		{ value: "MONS", isIncluded: false },
		{ value: "RED", isIncluded: false },
		{ value: "NOG", isIncluded: false },
		{ value: "NAME", isIncluded: false },
		{ value: "NAMER", isIncluded: false },
		{ value: "SAME", isIncluded: false },
		{ value: "SAMER", isIncluded: false },
		{ value: "SEAM", isIncluded: false },
		{ value: "SEAMER", isIncluded: false },
	];

	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
	const [currentWord, setCurrentWord] = useState<string>("");
	const [gameData, setGameData] = useState<Data[]>(originalData);
	const [validWordsData, setValidWordsData] =
		useState<WordsData[]>(validWordsList);
	const [currentWordScore, setCurrentWordScore] = useState<number>(0);
	const [gameScore, setGameScore] = useState<number>(0);

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
			let tempScore = currentWordScore + data.value;
			setCurrentWordScore(tempScore);
		}
	};

	const checkWordValidity = (word: string) => {
		let tempWordsList = validWordsData;
		let foundIndex = tempWordsList.findIndex((list) => list.value === word);

		if (foundIndex != -1) {
			if (!tempWordsList[foundIndex].isIncluded) {
				tempWordsList[foundIndex].isIncluded = true;
				setValidWordsData(tempWordsList);
				return 1;
			} else return 2;
		}
		return 0;
	};

	const endWordAndReset = (data: Data) => {
		let boxElements = document.querySelectorAll(".game-box");
		let validStatus = checkWordValidity(currentWord);
		let tempScore = gameScore;

		let boxElementsArray = Array.prototype.slice.call(boxElements);
		boxElementsArray.map((box) => {
			if (box.classList.contains("bg-teal-200")) {
				box.classList.remove("bg-teal-200");
				if (validStatus == 1) box.classList.add("bg-emerald-400");
				else if (validStatus == 2) box.classList.add("bg-amber-200");
				else box.classList.add("bg-red-400");

				setTimeout(() => {
					box.classList.remove("bg-emerald-400");
					box.classList.remove("bg-amber-200");
					box.classList.remove("bg-red-400");
					box.classList.add("bg-blue-400");
					box.classList.add("hover:bg-violet-400");
				}, 400);
			}
		});
		setTimeout(() => {
			if (validStatus == 1) tempScore += currentWordScore;
			setGameScore(tempScore);
			setCurrentWordScore(0);
			setCurrentWord("");
			setGameData(originalData);
		}, 400);
	};

	return (
		<div className="flex justify-center items-center flex-col gap-5">
			<WordDisplay word={currentWord} score={gameScore} />
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
