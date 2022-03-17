import { Data, FoundWords, WordsData } from "./Interfaces";

export type DataProps = {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	tileState: number;
};

export type ScoreProps = {
	word: string;
	score: number;
	totalWords: number;
	foundWords: number;
};

export type ResultProps = {
	gameArray: Data[];
	wordsList: WordsData[];
	score: number;
};

export type GameContextType = {
	isGameOn: boolean;
	gameArray: Data[];
	wordsList: WordsData[];
	score: number;
	toggleGameState: () => void;
	updateWordsList: (wordsList: WordsData[]) => void;
	updateGameArray: (gameArray: Data[]) => void;
	updateScore: (score: number) => void;
};

export type WordProps = {
	foundWords: FoundWords[];
};

let DEFAULT = 1,
	SELECTED = 2,
	CORRECT = 3,
	ALREADY = 4,
	WRONG = 5;
export { DEFAULT, SELECTED, CORRECT, ALREADY, WRONG };
