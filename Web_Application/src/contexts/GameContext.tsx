import React, { createContext, useReducer } from "react";
import {
	Data,
	GameAction,
	GameActionType,
	GameState,
	WordsData,
} from "../assets/data/Interfaces";
import { GameContextType } from "../assets/data/Types";

const defaultState = {
	isGameOn: false,
	gameArray: [],
	wordsList: [
		{ value: "RAM", isIncluded: true },
		{ value: "SHYAM", isIncluded: true },
		{ value: "SHIVA", isIncluded: true },
		{ value: "HANUMAN", isIncluded: false },
		{ value: "SURYA", isIncluded: false },
	],
};

const GameContext = createContext<GameContextType | null>(null);

const gameReducer = (state: GameState, action: GameAction) => {
	const { type, payload } = action;
	switch (type) {
		case GameActionType.TOGGLE: {
			return { ...state, isGameOn: !state.isGameOn };
		}
		case GameActionType.UPDATE_WORDS_LIST: {
			return { ...state, wordsList: payload };
		}
		case GameActionType.UPDATE_GAME_ARRAY: {
			return { ...state, gameArray: payload };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

const GameProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(gameReducer, defaultState);
	const toggleGameState = () => {
		dispatch({ type: GameActionType.TOGGLE, payload: null });
	};
	const updateWordsList = (wordsList: WordsData[]) => {
		dispatch({
			type: GameActionType.UPDATE_WORDS_LIST,
			payload: wordsList,
		});
	};
	const updateGameArray = (gameArray: Data[]) => {
		dispatch({
			type: GameActionType.UPDATE_GAME_ARRAY,
			payload: gameArray,
		});
	};
	const value = {
		isGameOn: state.isGameOn,
		gameArray: state.gameArray,
		wordsList: state.wordsList,
		toggleGameState,
		updateWordsList,
		updateGameArray,
	};

	return (
		<GameContext.Provider value={value}>
			{props.children}
		</GameContext.Provider>
	);
};

export { GameContext, GameProvider };
