import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  Pressable,
  View,
  Text,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import {
  ALREADY,
  CORRECT,
  DataProps,
  DEFAULT,
  SELECTED,
  WRONG,
} from "../assets/data/Types";

const screen = Dimensions.get("screen");

function GameBox(props: DataProps) {
  const getBoxColorFromState = (state: number) => {
    switch (state) {
      case SELECTED:
        return `bg-teal-200`;
      case CORRECT:
        return `bg-emerald-400`;
      case ALREADY:
        return `bg-amber-200`;
      case WRONG:
        return `bg-red-400`;
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
        tw`rounded-md flex justify-center items-center`,
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
