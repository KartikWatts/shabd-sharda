import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

import { ScoreProps } from "../assets/data/Types";
import CountDown from "./CountDown";

function ScoreDisplay(props: ScoreProps) {
	return (
		<View style={tw`h-20 w-full mt-4 mb-4 flex flex-row items-center px-4`}>
			<View>
				<CountDown />
				<View style={tw`w-30 px-2`}>
					<Text style={tw`text-slate-300 text-lg`}>
						Score:{" "}
						<Text style={tw`text-xl text-white`}>
							{props.score}
						</Text>
					</Text>
				</View>
			</View>
			<View style={tw`w-1/2 flex flex-col`}>
				<View style={tw`flex flex-row items-center mb-2`}>
					<Text style={tw`text-slate-300 text-lg`}> Found: </Text>
					<Text style={tw`text-xl text-white px-1`}>
						{props.foundWords}
					</Text>
					<Text style={tw`text-slate-200 text-lg`}>
						/{props.totalWords}
					</Text>
				</View>
				{props.word != "" ? (
					<Text style={tw`text-lg bg-white px-2`}>{props.word}</Text>
				) : (
					<View style={tw`h-7`}></View>
				)}
			</View>
		</View>
	);
}

export default ScoreDisplay;
