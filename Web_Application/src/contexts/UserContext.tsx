import React, { createContext, useReducer } from "react";
import { UserAction, UserState } from "../assets/data/Interfaces";
import { UserActionType, UserContextType } from "../assets/data/Types";
import bramhan from "../assets/images/bramhan.png";

const defaultState = {
	uid: null,
	displayName: null,
	photoURL: bramhan,
	providerId: null,
};

const UserContext = createContext<UserContextType | null>(null);

const userReducer = (state: UserState, action: UserAction) => {
	const { type, payload } = action;
	switch (type) {
		case UserActionType.LOGIN: {
			return { ...state, ...payload };
		}
		case UserActionType.UPDATE: {
			return { ...state, ...payload };
		}
		case UserActionType.LOGOUT: {
			return { ...state, ...defaultState };
		}
		default: {
			throw new Error(`Unhandled action type: ${type}`);
		}
	}
};

const UserProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(userReducer, defaultState);
	const authUser = (type: string, userData?: UserState) => {
		dispatch({
			type,
			payload: userData,
		});
	};

	const value = {
		data: {
			uid: state.uid,
			displayName: state.displayName,
			photoURL: state.photoURL,
			providerId: state.providerId,
		},
		authUser,
	};

	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
