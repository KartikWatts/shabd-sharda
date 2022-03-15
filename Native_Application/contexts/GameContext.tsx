import React, { createContext, useReducer } from "react";
import {
	GameAction,
	GameActionType,
	GameState,
} from "../assets/data/Interfaces";
import { GameContextType } from "../assets/data/Types";

const defaultState = { isGameOn: false };

const GameContext = createContext<GameContextType | null>(null);

const gameReducer = (state: GameState, action: GameAction) => {
	const { type } = action;
	switch (type) {
		case GameActionType.TOGGLE: {
			return { ...state, isGameOn: !state.isGameOn };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

const GameProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(gameReducer, defaultState);
	const toggleGameState = () => {
		dispatch({ type: GameActionType.TOGGLE });
	};
	const value = { isGameOn: state.isGameOn, toggleGameState };

	return (
		<GameContext.Provider value={value}>
			{props.children}
		</GameContext.Provider>
	);
};

export { GameContext, GameProvider };
