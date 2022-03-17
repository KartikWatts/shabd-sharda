import React, { useEffect, useState } from "react";
import { WordsData } from "../assets/data/Interfaces";
import { ResultProps } from "../assets/data/Types";

const ResultDisplay = (props: ResultProps) => {
	const [foundWords, setFoundWords] = useState<WordsData[]>([]);
	const [unFoundWords, setUnFoundWords] = useState<WordsData[]>([]);

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
		setFoundWords(foundWordsTemp);
		setUnFoundWords(unFoundWordsTemp);
	}, [props]);

	return (
		<div>
			Result
			<h1>Found</h1>
			<div>
				<ol>
					{foundWords.map((word, index) => {
						return <li key={index}>{word.value}</li>;
					})}
				</ol>
			</div>
			<h1>Not Found</h1>
			<div>
				<ol>
					{unFoundWords.map((word, index) => {
						return <li key={index}>{word.value}</li>;
					})}
				</ol>
			</div>
		</div>
	);
};

export default ResultDisplay;
