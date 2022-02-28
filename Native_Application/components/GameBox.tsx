import React, { useState } from "react";
import tw from "twrnc";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { DataProps } from "../assets/data/Types";

const screen = Dimensions.get("screen");

function GameBox(props: DataProps) {
	return (
		<View style={{}}>
			<View
				style={[
					styles.boxDimensions,
					tw`bg-blue-400 rounded-md flex justify-center items-center`,
				]}
			>
				<Text style={[styles.boxValue, tw`absolute top-0 left-1`]}>
					{props.value}
				</Text>
				<Text style={[styles.boxText]}>{props.letter}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	boxDimensions: {
		width: (screen.width - 25 - 5 * 2.5) / 4,
		height: (screen.width - 25 - 5 * 2.5) / 4,
		margin: 2.5,
		elevation: 8,
		shadowColor: "black",
		borderColor: "black",
		borderWidth: 2,
	},
	boxText: {
		fontSize: 30,
	},
	boxValue: {
		fontSize: 12,
	},
});

export default GameBox;
