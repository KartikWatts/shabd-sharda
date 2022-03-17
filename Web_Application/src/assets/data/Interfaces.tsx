import { DataProps } from "./Types";

export interface Data {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
}

export interface WordsData {
	value: string;
	isIncluded: boolean;
}

export interface Events {
	id: number;
	order: number;
}

export interface GameState {
	isGameOn: boolean;
	gameArray: Data[];
	wordsList: WordsData[];
}

export enum GameActionType {
	TOGGLE = "toggle",
	UPDATE_WORDS_LIST = "update-words-list",
	UPDATE_GAME_ARRAY = "update-game-array",
}
export interface GameAction {
	type: GameActionType;
	payload: any;
}

export interface FoundWords {
	score: number;
	value: string;
}
