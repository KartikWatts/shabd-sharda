import React, { useContext, useEffect, useState } from "react";
import countdown_timer from "../assets/sounds/countdown_time.mp3";
import { GameContext } from "../contexts/GameContext";

function CountDown() {
	const [countDown, setCountDown] = useState("120");
	const [countDownTime, setCountDownTime] = useState(0);
	const [isFinalSeconds, setIsFinalSeconds] = useState(false);

	const gameContext = useContext(GameContext);

	const [playCountDownTimer, setPlayCountDownTimer] = useState(
		new Audio(countdown_timer)
	);
	useEffect(() => {
		playCountDownTimer.loop = true;
	}, []);

	useEffect(() => {
		// TODO:: TO BE REPLACED BY TIME OF THE GAME ON THE SERVER IF EXISTS
		let cTime = new Date(+new Date() + 60000 * 0.2).getTime(); //Adding two minutes to current time
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
				clearInterval(countDownInterval);
				playCountDownTimer.pause();

				if (playCountDownTimer.paused) {
					setTimeout(() => {
						if (gameContext) gameContext.toggleGameState();
					}, 10);
				}
			}
		}, 1000);
	}, [countDownTime]);

	useEffect(() => {
		if (countDown == "10") {
			playCountDownTimer.play();
		}
	}, [countDown]);

	return (
		<div
			id="countdown_timer"
			className={`${
				isFinalSeconds ? "text-red-400" : "text-slate-300"
			}   text-3xl`}
		>
			{countDown}
		</div>
	);
}

export default CountDown;
