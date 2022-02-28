import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

import { WordProps } from "../assets/data/Types";

function WordDisplay(props: WordProps) {
	return (
		<View style={tw`h-8 w-full mb-8 flex flex-row items-center px-4`}>
			<View style={tw`w-30 px-2`}>
				<Text style={tw`text-slate-300 text-lg`}>
					Score:{" "}
					<Text style={tw`text-xl text-white`}>{props.score}</Text>
				</Text>
			</View>
			<View>
				{props.word != "" && (
					<Text style={tw`text-lg bg-white px-2`}>{props.word}</Text>
				)}
			</View>
		</View>
	);
}

export default WordDisplay;
