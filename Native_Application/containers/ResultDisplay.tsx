import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import { WordsData } from "../assets/data/Interfaces";
import { ResultProps } from "../assets/data/Types";
import GameBoxDisplay from "../components/GameBoxDisplay";

const PerformaceStats = (props: {
  name: string;
  value: any;
  altColor?: boolean;
}) => {
  return (
    <View
      style={[
        props.altColor && tw`bg-slate-600`,
        tw`flex flex-row items-center justify-center p-1 mt-0.5`,
      ]}
    >
      <View style={tw`w-3/5`}>
        <Text style={tw`text-slate-200 text-sm`}>{props.name}:</Text>
      </View>
      <View style={tw`w-2/5 pl-0.5`}>
        <Text style={tw`text-white text-sm`}>{props.value}</Text>
      </View>
    </View>
  );
};

const ResultDisplay = (props: ResultProps) => {
  const [foundWords, setFoundWords] = useState<WordsData[]>([]);
  const [unFoundWords, setUnFoundWords] = useState<WordsData[]>([]);
  const [score, setScore] = useState<number>(0);

  const sortByLength = (arr: WordsData[]) => {
    return arr.sort((x, y) => y.value.length - x.value.length);
  };

  useEffect(() => {
    const { wordsList } = props;
    let foundWordsTemp: WordsData[] = [],
      unFoundWordsTemp: WordsData[] = [];
    wordsList.map((word) => {
      if (word.isIncluded) {
        foundWordsTemp.push(word);
      } else {
        unFoundWordsTemp.push(word);
      }
    });

    sortByLength(foundWordsTemp);
    sortByLength(unFoundWordsTemp);

    setFoundWords(foundWordsTemp);
    setUnFoundWords(unFoundWordsTemp);
    setScore(props.score);
  }, [props]);

  const getAvgLength = () => {
    let totalLength = 0;
    foundWords.map((word) => {
      totalLength += word.value.length;
    });
    let avgLength = totalLength / foundWords.length;
    return parseFloat(avgLength.toString()).toFixed(2);
  };

  return (
    <>
      <Text style={tw`text-3xl p-3 text-amber-600 font-bold underline`}>
        Result
      </Text>
      <View style={tw`flex-1 flex flex-row w-full flex-wrap`}>
        <View style={tw`w-1/2 flex justify-center items-center h-70`}>
          <View
            style={tw`flex flex-row justify-center items-center w-full flex-wrap`}
          >
            {props.gameArray.map((data) => {
              return <GameBoxDisplay key={data.id} {...data} />;
            })}
          </View>
        </View>
        <View style={tw`w-1/2 flex justify-center items-center pl-2`}>
          <PerformaceStats name="Points" value={score} altColor />
          <PerformaceStats name="Words" value={foundWords.length} />
          <PerformaceStats
            name="Seconds per word"
            value={parseFloat((120 / foundWords.length).toString()).toFixed(2)}
            altColor
          />
          <PerformaceStats name="Average length" value={getAvgLength()} />
          <PerformaceStats
            name="Average points"
            value={parseFloat((score / foundWords.length).toString()).toFixed(
              2
            )}
            altColor
          />
        </View>
        <View style={tw`w-1/3 p-2`}>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-amber-500 text-sm`}>Words Found</Text>
            <Text style={tw`text-amber-300 text-xs ml-1`}>
              ({foundWords.length})
            </Text>
          </View>
          <ScrollView
            persistentScrollbar
            style={tw`w-8/8 h-60 border rounded-sm border-white p-2 `}
          >
            <View style={tw`flex-row flex-wrap`}>
              {foundWords.map((word, index) => {
                return (
                  <View key={index} style={tw`flex flex-row mr-3 mb-1`}>
                    <Text style={tw`text-sm text-amber-300`}>{word.value}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={tw`w-2/3 p-2`}>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-amber-500 text-sm`}>Not Found</Text>
            <Text style={tw`text-amber-300 text-xs ml-1`}>
              ({unFoundWords.length})
            </Text>
          </View>
          <ScrollView
            persistentScrollbar
            style={tw`w-8/8 h-60 border rounded-sm border-white p-2 `}
          >
            <View style={tw`flex-row flex-wrap`}>
              {unFoundWords.map((word, index) => {
                return (
                  <View key={index} style={tw`flex flex-row mr-3 mb-1`}>
                    <Text style={tw`text-sm text-amber-300`}>{word.value}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default ResultDisplay;
