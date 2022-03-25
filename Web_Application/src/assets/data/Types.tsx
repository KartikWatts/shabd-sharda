import { Data, FoundWords, UserState, WordsData } from "./Interfaces";

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

export type UserContextType = {
	data: UserState;
	authUser: (type: string, userData: UserState) => void;
};

export type WordProps = {
	foundWords: FoundWords[];
};

export enum UserActionType {
	LOGIN = "login",
	LOGOUT = "logout",
	UPDATE = "update",
}

export enum GameActionType {
	TOGGLE = "toggle",
	UPDATE_WORDS_LIST = "update-words-list",
	UPDATE_GAME_ARRAY = "update-game-array",
	UPDATE_SCORE = "update-score",
}
