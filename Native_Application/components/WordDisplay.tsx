import { ScrollView, Text, View } from "react-native";
import { WordProps } from "../assets/data/Types";
import tw from "twrnc";

function WordDisplay(props: WordProps) {
  return (
    <View style={tw`flex-1 w-full p-4 m-5 flex flex-col justify-center`}>
      <View style={tw`flex flex-row items-center`}>
        <Text style={tw`text-amber-500 text-base`}>Words Found</Text>
        <Text style={tw`text-amber-300 text-sm ml-1`}>
          ({props.foundWords.length})
        </Text>
      </View>
      <ScrollView
        persistentScrollbar
        style={tw`w-8/8 h-7/8 border rounded-sm border-white p-2 `}
      >
        <View style={tw`flex-row flex-wrap`}>
          {props.foundWords.map((word, index) => {
            return (
              <View key={index} style={tw`flex flex-row mr-6 mb-1`}>
                <Text style={tw`text-sm text-amber-300`}>{word.value}</Text>
                <Text style={tw`text-amber-500 ml-1`}>-{word.score}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default WordDisplay;
