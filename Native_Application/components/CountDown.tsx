import React, { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import tw from "twrnc";
import { Text, View } from "react-native";
import { GameContext } from "../contexts/GameContext";

function CountDown() {
	const [countDown, setCountDown] = useState("120");
	const [countDownTime, setCountDownTime] = useState(0);
	const [isFinalSeconds, setIsFinalSeconds] = useState(false);

	const gameContext = useContext(GameContext);

	const [countDownTimerSound, setCountDownTimerSound] =
		useState<Audio.Sound>();

	useEffect(() => {
		(async () => {
			const { sound } = await Audio.Sound.createAsync(
				require("../assets/sounds/countdown_time.mp3")
			);
			setCountDownTimerSound(sound);
		})();
	}, []);

	useEffect(() => {
		if (countDownTimerSound) countDownTimerSound.setIsLoopingAsync(true);
	}, [countDownTimerSound]);

	useEffect(() => {
		// TODO:: TO BE REPLACED BY TIME OF THE GAME ON THE SERVER IF EXISTS
		let cTime = new Date(+new Date() + 60000 * 2).getTime(); //Adding two minutes to current time
		if (!countDownTime) {
			setCountDownTime(cTime);
			return;
		}
		let seconds = 120;
		let countDownInterval = setInterval(() => {
			let now = new Date(+new Date() - 1000 * 2).getTime();
			let difference = countDownTime - now + 1;
			if (difference < 0) difference = 0;
			let minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60)
			);
			seconds = Math.floor(
				minutes * 60 + (difference % (1000 * 60)) / 1000
			);
			let secondsStr = seconds.toString();
			setCountDown(secondsStr);
			if (seconds <= 10) {
				setIsFinalSeconds(true);
			}
			if (seconds == 0) {
				if (countDownTimerSound) countDownTimerSound.stopAsync();
				clearInterval(countDownInterval);
				setTimeout(() => {
					if (gameContext) gameContext.toggleGameState();
				}, 10);
			}
		}, 1000);
	}, [countDownTime]);

	useEffect(() => {
		if (countDownTimerSound) {
			if (countDown == "10") {
				countDownTimerSound.playAsync();
			}
			if (countDown == "0") {
				countDownTimerSound.stopAsync();
			}
		}
	}, [countDown]);

	return (
		<View style={tw`w-30 px-2`}>
			<Text
				style={[
					isFinalSeconds ? tw`text-red-400` : tw`text-slate-300`,
					tw`text-3xl`,
				]}
			>
				{countDown}
			</Text>
		</View>
	);
}

export default CountDown;
