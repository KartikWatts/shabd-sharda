import { Data, FoundWords, WordsData } from "./Interfaces";

export type DataProps = {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	isMouseDown: boolean;
	selectedBoxId: number;
	updateState: (id: number) => void;
	updateSelctedBoxId: (id: number) => void;
	endWord: () => void;
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
};

export type GameContextType = {
	isGameOn: boolean;
	gameArray: Data[];
	wordsList: WordsData[];
	toggleGameState: () => void;
	updateWordsList: (wordsList: WordsData[]) => void;
	updateGameArray: (gameArray: Data[]) => void;
};

export type WordProps = {
	foundWords: FoundWords[];
};
