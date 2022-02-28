import React, { useState } from "react";
import tw from "twrnc";
import { View, Text } from "react-native";
import { WordsData, Data } from "../assets/data/Interfaces";
import { originalData, solutionData } from "../assets/data/GameDataSource";
import GameBox from "../components/GameBox";

function Game() {
	let validWordsList: Array<WordsData> = [];

	const [currentWord, setCurrentWord] = useState<string>("");
	const [gameData, setGameData] = useState<Data[]>(originalData);
	const [validWordsData, setValidWordsData] =
		useState<WordsData[]>(validWordsList);
	const [currentWordScore, setCurrentWordScore] = useState<number>(0);
	const [gameScore, setGameScore] = useState<number>(0);

	solutionData.map((solution) => {
		if (solution.length > 2) {
			validWordsList.push({
				value: solution.toUpperCase(),
				isIncluded: false,
			});
		}
	});

	return (
		<View
			style={tw`flex justify-center items-center flex-col w-full h-full`}
		>
			<View
				style={tw`flex flex-row justify-center items-center w-full flex-wrap`}
			>
				{gameData.map((data) => {
					return <GameBox key={data.id} {...data} />;
				})}
			</View>
		</View>
	);
}

export default Game;
