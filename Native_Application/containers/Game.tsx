import React, { useState } from "react";
import tw from "twrnc";
import { View, Dimensions } from "react-native";
import { WordsData, Data, LayoutData } from "../assets/data/Interfaces";
import { originalData, solutionData } from "../assets/data/GameDataSource";
import GameBox from "../components/GameBox";

const screen = Dimensions.get("screen");
const boxSide = (screen.width - 25 - 5 * 2.5) / 4;

function Game() {
	let validWordsList: Array<WordsData> = [];

	const [currentWord, setCurrentWord] = useState<string>("");
	const [gameData, setGameData] = useState<Data[]>(originalData);
	const [validWordsData, setValidWordsData] =
		useState<WordsData[]>(validWordsList);
	const [currentWordScore, setCurrentWordScore] = useState<number>(0);
	const [gameScore, setGameScore] = useState<number>(0);
	const [deviceDimension, setDeviceDimension] = useState<LayoutData | null>(
		null
	);

	solutionData.map((solution) => {
		if (solution.length > 2) {
			validWordsList.push({
				value: solution.toUpperCase(),
				isIncluded: false,
			});
		}
	});

	const updateState = (id: number) => {
		let data = { ...gameData[id] };
		let newData = { ...gameData[id] };
		if (!data.isIncluded) {
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

	return (
		<View
			style={tw`flex justify-center items-center flex-col w-full h-full`}
		>
			<View
				onLayout={({ nativeEvent }) => {
					setDeviceDimension(nativeEvent.layout);
				}}
				onTouchMove={(e) => {
					if (deviceDimension) {
						let boxX = Math.floor(
							e.nativeEvent.pageY - deviceDimension.y
						);
						let boxY = Math.floor(
							e.nativeEvent.pageX - deviceDimension.x
						);
						let indexX = getEventZone(boxX);
						let indexY = getEventZone(boxY);
						let boxId = getBoxIdByEventCoords(indexX, indexY);
						if (boxId != null) updateState(boxId);
					}
				}}
				onTouchStart={() => {
					console.log("Touch Started");
				}}
				onTouchEnd={() => {
					console.log("Touch Ended");
					let validStatus = checkWordValidity(currentWord);
					let tempScore = gameScore;

					setTimeout(() => {
						if (validStatus == 1) tempScore += currentWordScore;
						console.log(currentWord);
						console.log("Score: ", currentWordScore);

						setGameScore(tempScore);
						setCurrentWordScore(0);
						setCurrentWord("");
						setGameData(originalData);
					}, 400);
				}}
				style={tw`flex flex-row justify-center items-center w-full flex-wrap`}
			>
				{gameData.map((data, index) => {
					return <GameBox key={data.id} {...data} />;
				})}
			</View>
		</View>
	);
}

export default Game;
