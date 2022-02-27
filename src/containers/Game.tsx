import React, { useState } from "react";
import GameBox from "../components/GameBox";
import WordDisplay from "../components/WordDisplay";
import letter_selector_sound from "../assets/sounds/letter_selector.mp3";
import already_present_sound from "../assets/sounds/already_present.mp3";
import accepted_word_sound from "../assets/sounds/accepted_word.mp3";
import invalid_word_sound from "../assets/sounds/invalid_word.mp3";
import bonus1_sound from "../assets/sounds/bonus1.mp3";
import useSound from "use-sound";
import { originalData, solutionData } from "../assets/data/GameDataSource";

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

	let validWordsList: Array<WordsData> = [];

	solutionData.map((solution) => {
		validWordsList.push({
			value: solution.toUpperCase(),
			isIncluded: false,
		});
	});

	const [playLetterSelectorSound] = useSound(letter_selector_sound);
	const [playAlreadyPresentSound] = useSound(already_present_sound);
	const [playAcceptedWordSound] = useSound(accepted_word_sound);
	const [playInvalidWordSound] = useSound(invalid_word_sound);
	const [playBonusSound] = useSound(bonus1_sound);

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
			playLetterSelectorSound();
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

		let specialComments: HTMLElement | null =
			document.querySelector(".special-comments");

		if (validStatus == 0) playInvalidWordSound();
		if (validStatus == 1) {
			tempScore += currentWordScore;
			if (currentWordScore >= 20 || currentWord.length > 4) {
				playBonusSound();
				if (specialComments) {
					specialComments.classList.remove("scale-0");
					specialComments.classList.add("scale-1");
				}
			} else playAcceptedWordSound();
		}
		if (validStatus == 2) playAlreadyPresentSound();

		setTimeout(() => {
			if (specialComments) {
				specialComments.classList.remove("scale-1");
				specialComments.classList.add("scale-0");
			}
			setGameScore(tempScore);
			setCurrentWordScore(0);
			setCurrentWord("");
			setGameData(originalData);
		}, 400);
	};

	return (
		<div className="flex justify-center items-center flex-col gap-5">
			<div
				className={`special-comments absolute w-full h-full z-10 flex justify-center items-center bg-slate-600/[0.5] rounded-lg	scale-0`}
			>
				<div
					className="font-mono text-4xl rotate-[-5deg] font-bold text-white select-none"
					style={{ textShadow: "#FC0 1px 0 10px" }}
				>
					Awesome!
				</div>
			</div>
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
