import { FoundWords } from "./Interfaces";

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

export type GameContextType = {
	isGameOn: boolean;
	toggleGameState: () => void;
};

export type WordProps = {
	foundWords: FoundWords[];
};
