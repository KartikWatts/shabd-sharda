import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { DEFAULT } from "../assets/data/Types";
import { Data } from "../assets/data/Interfaces";

const screen = Dimensions.get("screen");

function GameBoxDisplay(props: Data) {
  const getBoxColorFromState = (state: number) => {
    switch (state) {
      default:
        return `bg-blue-400`;
    }
  };

  const [tileColor, setTileColor] = useState(getBoxColorFromState(DEFAULT));

  useEffect(() => {
    setTileColor(getBoxColorFromState(props.tileState));
  }, [props.tileState]);

  return (
    <View
      style={[
        styles.boxDimensions,
        tw`rounded-sm flex justify-center items-center`,
        tw`${tileColor}`,
      ]}
    >
      <Text style={[styles.boxValue, tw`absolute top-0 left-1`]}>
        {props.value}
      </Text>
      <Text style={[styles.boxText]}>{props.letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxDimensions: {
    width: (screen.width - 25 - 5 * 2.5) / 8,
    height: (screen.width - 25 - 5 * 2.5) / 8,
    margin: 0.8,
    elevation: 8,
    shadowColor: "black",
    borderColor: "black",
    borderWidth: 1,
  },
  boxText: {
    fontSize: 15,
  },
  boxValue: {
    fontSize: 6,
  },
});

export default GameBoxDisplay;
