import React, { useContext, useEffect, useState } from "react";
import GameBox from "../components/GameBox";
import letter_selector_sound from "../assets/sounds/letter_selector.mp3";
import already_present_sound from "../assets/sounds/already_present.mp3";
import accepted_word_sound from "../assets/sounds/accepted_word.mp3";
import invalid_word_sound from "../assets/sounds/invalid_word.mp3";
import bonus1_sound from "../assets/sounds/bonus1.mp3";
import useSound from "use-sound";
import { originalData, solutionData } from "../assets/data/GameDataSource";
import { WordsData, Data, FoundWords } from "../assets/data/Interfaces";
import ScoreDisplay from "../components/ScoreDisplay";
import WordDisplay from "../components/WordDisplay";
import { GameContext } from "../contexts/GameContext";

function Game() {
	let validWordsList: Array<WordsData> = [];
	let isMouseOut: boolean = false;

	solutionData.map((solution) => {
		if (solution.length > 2) {
			validWordsList.push({
				value: solution.toUpperCase(),
				isIncluded: false,
			});
		}
	});

	const [playLetterSelectorSound] = useSound(letter_selector_sound);
	const [playAlreadyPresentSound] = useSound(already_present_sound);
	const [playAcceptedWordSound] = useSound(accepted_word_sound);
	const [playInvalidWordSound] = useSound(invalid_word_sound);
	const [playBonusSound] = useSound(bonus1_sound);

	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
	const [isTouchActive, setIsTouchActive] = useState(false);
	const [currentWord, setCurrentWord] = useState<string>("");
	const [gameData, setGameData] = useState<Data[]>(originalData);
	const [validWordsData, setValidWordsData] =
		useState<WordsData[]>(validWordsList);
	const [currentWordScore, setCurrentWordScore] = useState<number>(0);
	const [gameScore, setGameScore] = useState<number>(0);
	const [selectedBoxId, setSelectedBoxId] = useState<number>(-1);
	const [foundWords, setFoundWords] = useState<FoundWords[]>([]);
	const gameContext = useContext(GameContext);

	useEffect(() => {
		if (gameContext) gameContext.updateGameArray(gameData);
	}, []);

	document.addEventListener("mousedown", () => {
		setIsMouseDown(true);
	});
	document.addEventListener("mouseup", () => {
		setIsMouseDown(false);
	});
	document.addEventListener("touchstart", () => {
		setIsTouchActive(true);
	});
	document.addEventListener("touchend", () => {
		setIsTouchActive(false);
	});

	const updateSelectedBoxId = (id: number) => {
		setSelectedBoxId(id);
	};

	const updateState = (id: number, alarm: any) => {
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

			if (alarm) playLetterSelectorSound();

			let newWord = currentWord.concat(data.letter);
			setCurrentWord(newWord);
			let tempScore = currentWordScore + data.value;
			setCurrentWordScore(tempScore);
		}
	};

	const getEventZone = (mousePosition: number) => {
		let index = -1;
		if (mousePosition / 20 >= 1 && mousePosition / 20 <= 4) index = 0;
		else if (mousePosition / 20 >= 5 && mousePosition / 20 <= 8) index = 1;
		else if (mousePosition / 20 >= 9 && mousePosition / 20 <= 12) index = 2;
		else if (mousePosition / 20 >= 14 && mousePosition / 20 <= 17)
			index = 3;
		else index = -1;
		return index;
	};

	const getBoxIdByEventCoords = (x: number, y: number) => {
		if (x == -1 || y == -1) return null;
		return x * 4 + y;
	};

	let gameBox: HTMLElement | null = document.querySelector(".game-box");

	const checkWordValidity = (word: string) => {
		let tempWordsList = validWordsData;
		let foundIndex = tempWordsList.findIndex((list) => list.value === word);

		if (foundIndex != -1) {
			if (!tempWordsList[foundIndex].isIncluded) {
				tempWordsList[foundIndex].isIncluded = true;
				setValidWordsData(tempWordsList);
				if (gameContext) gameContext.updateWordsList(tempWordsList);
				return 1;
			} else return 2;
		}
		return 0;
	};

	const endWordAndReset = (alarm: any) => {
		let validStatus = checkWordValidity(currentWord);
		let tempScore = gameScore;

		let boxElements = document.querySelectorAll(".game-box");
		// console.log(currentWord);

		let boxElementsArray = Array.prototype.slice.call(boxElements);
		boxElementsArray.map((box) => {
			if (box.classList.contains("bg-teal-200")) {
				box.classList.remove("bg-teal-200");
				if (currentWord.length >= 3) {
					if (validStatus == 1) box.classList.add("bg-emerald-400");
					else if (validStatus == 2)
						box.classList.add("bg-amber-200");
					else box.classList.add("bg-red-400");
				} else {
					box.classList.add("bg-blue-400");
				}

				setTimeout(() => {
					box.classList.remove("bg-emerald-400");
					box.classList.remove("bg-amber-200");
					box.classList.remove("bg-red-400");
					box.classList.add("bg-blue-400");
					box.classList.add("hover:bg-violet-400");
					box.classList.remove("selected-box");
					box.removeAttribute("data-order");
				}, 400);
			}
		});

		if (currentWord.length < 3) {
			setTimeout(() => {
				setCurrentWordScore(0);
				setCurrentWord("");
				setGameData(originalData);
				updateSelectedBoxId(-1);
			}, 400);
			return;
		}

		let specialComments: HTMLElement | null =
			document.querySelector(".special-comments");

		if (alarm && currentWord.length > 2) {
			if (validStatus == 0) playInvalidWordSound();
			if (validStatus == 1) {
				if (currentWordScore >= 16 || currentWord.length > 5) {
					playBonusSound();
					if (specialComments) {
						specialComments.classList.remove("scale-0");
						specialComments.classList.add("scale-1");
					}
				} else playAcceptedWordSound();
			}
			if (validStatus == 2) playAlreadyPresentSound();
		}

		setTimeout(() => {
			if (specialComments) {
				specialComments.classList.remove("scale-1");
				specialComments.classList.add("scale-0");
			}
			if (validStatus == 1) {
				tempScore += currentWordScore;

				let tempFoundWords = foundWords;
				tempFoundWords.push({
					score: currentWordScore,
					value: currentWord,
				});
				setFoundWords(tempFoundWords);
				let foundWordsDiv = document.getElementById("found-words-list");
				if (foundWordsDiv)
					foundWordsDiv.scrollTop = foundWordsDiv.scrollHeight;
			}

			setGameScore(tempScore);
			if (gameContext) gameContext.updateScore(tempScore);
			setCurrentWordScore(0);
			setCurrentWord("");
			setGameData(originalData);
			updateSelectedBoxId(-1);
		}, 400);
	};

	/**
	 * Checks if current boxId is valid (It should be adjacent tile of previous boxId always)
	 */
	const isBoxIdValid = (id: number) => {
		let defArray = [-1, 1, -3, -4, -5, 3, 4, 5];
		if (selectedBoxId == -1) return true;
		for (let index = 0; index < defArray.length; index++) {
			let validId = selectedBoxId - defArray[index];
			if (selectedBoxId % 4 == 0 && id % 4 == 3) return false;
			if (selectedBoxId % 4 == 3 && id % 4 == 0) return false;
			if (validId >= 0 && id == validId) return true;
		}
		return false;
	};

	const handelTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		if (gameBox) {
			let mouseX = event.touches[0].clientX - gameBox.offsetLeft,
				mouseY = event.touches[0].clientY - gameBox.offsetTop;
			// console.log(gameBox.offsetWidth);
			// console.log(mouseX);

			if (
				mouseX < 0 ||
				mouseX > gameBox.offsetWidth ||
				mouseY < 0 ||
				mouseY > gameBox.offsetHeight
			) {
				if (!isMouseOut) {
					isMouseOut = true;
					setTimeout(() => {
						endWordAndReset(true);
					}, 10);
				}
				return;
			}

			let indexX = getEventZone(mouseY);
			let indexY = getEventZone(mouseX);
			let boxId = getBoxIdByEventCoords(indexX, indexY);

			if (boxId != null && !gameData[boxId].isIncluded) {
				if (!isBoxIdValid(boxId)) return;
				updateSelectedBoxId(boxId);

				let currentBox: HTMLElement | null = document.getElementById(
					`box-${boxId}`
				);
				if (currentBox) {
					currentBox.classList.remove("bg-blue-400");
					currentBox.classList.remove("hover:bg-violet-400");
					currentBox.classList.add("bg-teal-200");
					updateState(boxId, true);
				}
			}
		}
	};

	return (
		<div className="flex justify-center items-center flex-col gap-5 select-none">
			<div
				className={`special-comments absolute w-full h-full z-10 flex justify-center items-center bg-slate-600/[0.5] rounded-lg	scale-0`}
			>
				<div
					className="font-mono text-4xl font-bold text-white select-none"
					style={{ textShadow: "#FC0 1px 0 10px" }}
				>
					Awesome!
				</div>
			</div>
			<ScoreDisplay
				word={currentWord}
				score={gameScore}
				totalWords={solutionData.length || 0}
				foundWords={foundWords.length}
			/>
			<div
				className="game-box grid grid-cols-4 gap-1.5"
				onTouchMove={(e) => {
					handelTouchMove(e);
				}}
				onTouchEnd={() => {
					if (!isMouseOut) {
						setTimeout(() => {
							endWordAndReset(true);
						}, 10);
					}
				}}
				onMouseLeave={(e) => {
					if (isMouseDown) {
						setTimeout(() => {
							endWordAndReset(true);
						}, 10);
					}
				}}
			>
				{gameData.map((data) => {
					return (
						<GameBox
							key={data.id}
							endWord={() => {
								endWordAndReset(true);
							}}
							isMouseDown={isMouseDown}
							updateState={() => updateState(data.id, true)}
							selectedBoxId={selectedBoxId}
							updateSelctedBoxId={() =>
								updateSelectedBoxId(data.id)
							}
							{...data}
						/>
					);
				})}
			</div>
			<WordDisplay foundWords={foundWords} />
		</div>
	);
}

export default Game;
