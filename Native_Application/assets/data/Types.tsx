import { FoundWords } from "./Interfaces";

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

let DEFAULT = 1,
	SELECTED = 2,
	CORRECT = 3,
	ALREADY = 4,
	WRONG = 5;

export type GameContextType = {
	isGameOn: boolean;
	toggleGameState: () => void;
};

export type WordProps = {
	foundWords: FoundWords[];
};

export { DEFAULT, SELECTED, CORRECT, ALREADY, WRONG };
