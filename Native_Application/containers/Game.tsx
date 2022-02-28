import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { View, Text, GestureResponderEvent, StyleSheet } from "react-native";
import { WordsData, Data, LayoutData } from "../assets/data/Interfaces";
import { originalData, solutionData } from "../assets/data/GameDataSource";
import GameBox from "../components/GameBox";
import WordDisplay from "../components/WordDisplay";
import { ALREADY, CORRECT, SELECTED, WRONG } from "../assets/data/Types";
import { Audio } from "expo-av";

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
	const [isItAwesome, setIsItAwesome] = useState<boolean>(false);

	solutionData.map((solution) => {
		if (solution.length > 2) {
			validWordsList.push({
				value: solution.toUpperCase(),
				isIncluded: false,
			});
		}
	});

	const [sound, setSound] = useState<Audio.Sound>();

	const playLetterSelectorSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sounds/letter_selector.mp3")
		);
		setSound(sound);
		await sound.playAsync();
	};

	const playAlreadyPresentSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sounds/already_present.mp3")
		);
		setSound(sound);
		await sound.playAsync();
	};

	const playAcceptedWordSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sounds/accepted_word.mp3")
		);
		setSound(sound);
		await sound.playAsync();
	};

	const playInvalidWordSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sounds/invalid_word.mp3")
		);
		setSound(sound);
		await sound.playAsync();
	};

	const playBonusSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sounds/bonus1.mp3")
		);
		setSound(sound);
		await sound.playAsync();
	};

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const updateState = (id: number) => {
		let data = { ...gameData[id] };
		let newData = { ...gameData[id] };
		if (!data.isIncluded) {
			playLetterSelectorSound();
			newData = {
				...gameData[data.id],
				isIncluded: true,
				tileState: SELECTED,
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

	const handelTouchMove = (e: GestureResponderEvent) => {
		if (deviceDimension) {
			let boxX = Math.floor(e.nativeEvent.pageY - deviceDimension.y);
			let boxY = Math.floor(e.nativeEvent.pageX - deviceDimension.x);
			let indexX = getEventZone(boxX);
			let indexY = getEventZone(boxY);
			let boxId = getBoxIdByEventCoords(indexX, indexY);
			if (boxId != null) updateState(boxId);
		}
	};

	useEffect(() => {}, [gameData]);

	const handleTouchEnd = () => {
		let validStatus = checkWordValidity(currentWord);
		let tempScore = gameScore;
		let tempData = gameData;

		tempData.map((data) => {
			if (data.isIncluded) {
				if (validStatus == 1) tempData[data.id].tileState = CORRECT;
				else if (validStatus == 2)
					tempData[data.id].tileState = ALREADY;
				else tempData[data.id].tileState = WRONG;
			}
		});

		setGameData(tempData);
		if (validStatus == 0) playInvalidWordSound();
		if (validStatus == 1) {
			if (currentWordScore >= 16 || currentWord.length > 5) {
				playBonusSound();
				setIsItAwesome(true);
			} else playAcceptedWordSound();
		}
		if (validStatus == 2) playAlreadyPresentSound();

		setTimeout(() => {
			if (validStatus == 1) tempScore += currentWordScore;
			console.log(currentWord);
			console.log("Score: ", currentWordScore);

			setGameScore(tempScore);
			setCurrentWordScore(0);
			setCurrentWord("");
		}, 5);

		setTimeout(() => {
			setIsItAwesome(false);
			setGameData(originalData);
		}, 400);
	};

	return (
		<View
			style={tw`flex justify-center items-center flex-col w-full h-full`}
		>
			<View
				style={[
					isItAwesome
						? {
								opacity: 1,
								backgroundColor: "rgba(0,0,0,0.3)",
								zIndex: 10,
						  }
						: { opacity: 0, zIndex: 0 },
					tw`absolute w-full h-full flex justify-center items-center rounded-lg`,
				]}
			>
				<Text
					style={[
						styles.awesomeText,
						tw`text-3xl font-bold text-white`,
					]}
				>
					Awesome!
				</Text>
			</View>

			<WordDisplay word={currentWord} score={gameScore} />

			<View
				onLayout={({ nativeEvent }) => {
					setDeviceDimension(nativeEvent.layout);
				}}
				onTouchMove={(e) => {
					handelTouchMove(e);
				}}
				onTouchEnd={() => {
					handleTouchEnd();
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

const styles = StyleSheet.create({
	awesomeText: {
		textShadowColor: "#FC0",
		textShadowOffset: { width: -1, height: 0 },
		textShadowRadius: 10,
	},
});

export default Game;
