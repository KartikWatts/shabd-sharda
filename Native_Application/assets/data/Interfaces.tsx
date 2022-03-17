export interface Data {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	tileState: number;
}

export interface WordsData {
	value: string;
	isIncluded: boolean;
}

export interface Events {
	id: number;
	order: number;
}

export interface LayoutData {
	height: number;
	width: number;
	x: number;
	y: number;
}

export interface GameState {
	isGameOn: boolean;
	gameArray: Data[];
	wordsList: WordsData[];
	score: number;
}

export enum GameActionType {
	TOGGLE = "toggle",
	UPDATE_WORDS_LIST = "update-words-list",
	UPDATE_GAME_ARRAY = "update-game-array",
	UPDATE_SCORE = "update-score",
}
export interface GameAction {
	type: GameActionType;
	payload: any;
}

export interface FoundWords {
	score: number;
	value: string;
}
