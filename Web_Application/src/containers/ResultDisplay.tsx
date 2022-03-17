import React, { useEffect, useState } from "react";
import { WordsData } from "../assets/data/Interfaces";
import { ResultProps } from "../assets/data/Types";
import GameBoxDisplay from "../components/GameBoxDisplay";

const PerformaceStats = (props: { name: string; value: any }) => {
	return (
		<>
			<div className="w-3/5 lg:w-2/5 text-slate-300 text-xs sm:text-xl mt-1">
				{props.name}:
			</div>
			<div className="w-2/5 lg:w-3/5 text-white text-sm sm:text-xl mt-1">
				{props.value}
			</div>
		</>
	);
};

const ResultDisplay = (props: ResultProps) => {
	const [foundWords, setFoundWords] = useState<WordsData[]>([]);
	const [unFoundWords, setUnFoundWords] = useState<WordsData[]>([]);
	const [score, setScore] = useState<number>(0);

	const sortByLength = (arr: WordsData[]) => {
		return arr.sort((x, y) => y.value.length - x.value.length);
	};

	useEffect(() => {
		const { wordsList } = props;
		let foundWordsTemp: WordsData[] = [],
			unFoundWordsTemp: WordsData[] = [];
		wordsList.map((word) => {
			if (word.isIncluded) {
				foundWordsTemp.push(word);
			} else {
				unFoundWordsTemp.push(word);
			}
		});

		sortByLength(foundWordsTemp);
		sortByLength(unFoundWordsTemp);

		setFoundWords(foundWordsTemp);
		setUnFoundWords(unFoundWordsTemp);
		setScore(props.score);
	}, [props]);

	const getAvgLength = () => {
		let totalLength = 0;
		foundWords.map((word) => {
			totalLength += word.value.length;
		});
		let avgLength = totalLength / foundWords.length;
		return parseFloat(avgLength.toString()).toFixed(2);
	};

	return (
		<>
			<div className="text-4xl sm:text-5xl p-5 sm:p-10">
				<span className=" text-amber-600 font-semibold underline underline-offset-4 decoration-amber-300">
					Result
				</span>
			</div>
			<div className="flex-1 flex flex-row w-full flex-wrap">
				<div className="w-1/2 flex justify-center items-center h-70">
					<div className="grid grid-cols-4 gap-0.5 sm:gap-0.75">
						{props.gameArray.map((data) => {
							return <GameBoxDisplay key={data.id} {...data} />;
						})}
					</div>
				</div>
				<div className="w-1/2 flex justify-center items-center">
					<div className="w-full lg:w-4/5 flex flex-row items-center flex-wrap leading-10">
						<PerformaceStats name="Points" value={score} />
						<PerformaceStats
							name="Words"
							value={foundWords.length}
						/>
						<PerformaceStats
							name="Seconds per word"
							value={parseFloat(
								(120 / foundWords.length).toString()
							).toFixed(2)}
						/>
						<PerformaceStats
							name="Average length"
							value={getAvgLength()}
						/>
						<PerformaceStats
							name="Average points"
							value={parseFloat(
								(score / foundWords.length).toString()
							).toFixed(2)}
						/>
					</div>
				</div>
				<div className="w-1/3 p-3 sm:p-5">
					<span className="text-amber-500 text-base sm:text-lg p1 sm:p-2">
						Found{" "}
						<span className="text-amber-300 text-md">
							({foundWords.length})
						</span>
					</span>
					<div
						id="found-words-list"
						className="w-full h-48 sm:h-64 p-2 sm:p-4 border-2 scroll-smooth overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-slate-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-sm"
					>
						{foundWords.map((word, index) => {
							return (
								<span
									key={index}
									className="text-sm sm:text-base text-amber-300 mr-6 sm:mr-10 mb-1 sm:mb-2 inline-block"
								>
									{word.value}
								</span>
							);
						})}
					</div>
				</div>
				<div className="w-2/3 p-3 sm:p-5">
					<span className="text-amber-500 text-base sm:text-lg p-2">
						Not Found{" "}
						<span className="text-amber-300 text-md">
							({unFoundWords.length})
						</span>
					</span>
					<div
						id="found-words-list"
						className="w-full h-48 sm:h-64 p-2 sm:p-4 border-2 scroll-smooth overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-slate-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-sm"
					>
						{unFoundWords.map((word, index) => {
							return (
								<span
									key={index}
									className="text-sm sm:text-base text-amber-300 mr-6 sm:mr-10 mb-1 sm:mb-2 inline-block"
								>
									{word.value}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ResultDisplay;
