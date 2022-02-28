import React from "react";
import tw from "twrnc";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import Game from "./containers/Game";

NavigationBar.setBackgroundColorAsync("rgb(71, 85, 105)");
NavigationBar.setBehaviorAsync("overlay-swipe");
NavigationBar.setVisibilityAsync("hidden");

export default function App() {
	return (
		<View
			style={tw`w-full h-full bg-slate-500 flex justify-center items-center flex-col`}
		>
			<Game />
			<StatusBar hidden={true} />
		</View>
	);
}
