import React, { useContext } from "react";
import tw from "twrnc";
import { Text, TouchableOpacity, View } from "react-native";
import Game from "../containers/Game";
import { GameContext } from "../contexts/GameContext";

export default function GameWrapper() {
	const gameContext = useContext(GameContext);

	return (
		<View
			style={tw`w-full h-full bg-slate-500 flex justify-center items-center flex-col`}
		>
			{gameContext && gameContext.isGameOn ? (
				<Game />
			) : (
				<View>
					<TouchableOpacity
						onPress={() => {
							if (gameContext) {
								gameContext.toggleGameState();
							}
						}}
						style={tw`bg-yellow-300 p-8 border-8 hover:bg-amber-300 border-blue-400 rounded-xl`}
					>
						<Text style={tw`text-xl font-bold text-blue-600`}>
							Start Game
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
