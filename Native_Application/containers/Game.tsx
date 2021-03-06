import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { View, Text, GestureResponderEvent, StyleSheet } from "react-native";
import {
  WordsData,
  Data,
  LayoutData,
  FoundWords,
} from "../assets/data/Interfaces";
import { originalData, solutionData } from "../assets/data/GameDataSource";
import GameBox from "../components/GameBox";
import { ALREADY, CORRECT, SELECTED, WRONG } from "../assets/data/Types";
import { Audio } from "expo-av";
import ScoreDisplay from "../components/ScoreDisplay";
import WordDisplay from "../components/WordDisplay";
import { GameContext } from "../contexts/GameContext";

function Game() {
  let validWordsList: Array<WordsData> = [];
  let isMouseOut = false;

  const [currentWord, setCurrentWord] = useState<string>("");
  const [gameData, setGameData] = useState<Data[]>(originalData);
  const [validWordsData, setValidWordsData] =
    useState<WordsData[]>(validWordsList);
  const [currentWordScore, setCurrentWordScore] = useState<number>(0);
  const [gameScore, setGameScore] = useState<number>(0);
  const [deviceDimension, setDeviceDimension] = useState<LayoutData | null>(
    null
  );
  const [isItAwesome, setIsItAwesome] = useState<boolean>(false);
  const [selectedBoxId, setSelectedBoxId] = useState<number>(-1);
  const [foundWords, setFoundWords] = useState<FoundWords[]>([]);
  const gameContext = useContext(GameContext);

  solutionData.map((solution) => {
    if (solution.length > 2) {
      validWordsList.push({
        value: solution.toUpperCase(),
        isIncluded: false,
      });
    }
  });

  useEffect(() => {
    if (gameContext) gameContext.updateGameArray(gameData);
  }, []);

  const [sound, setSound] = useState<Audio.Sound>();

  const playLetterSelectorSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/letter_selector.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const playAlreadyPresentSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/already_present.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const playAcceptedWordSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/accepted_word.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const playInvalidWordSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/invalid_word.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const playBonusSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/bonus1.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const updateState = (id: number) => {
    let data = { ...gameData[id] };
    let newData = { ...gameData[id] };
    if (!data.isIncluded) {
      setTimeout(() => {
        playLetterSelectorSound();
      }, 10);
      newData = {
        ...gameData[data.id],
        isIncluded: true,
        tileState: SELECTED,
      };

      setGameData([
        ...gameData.slice(0, data.id),
        newData,
        ...gameData.slice(data.id + 1),
      ]);

      let newWord = currentWord.concat(data.letter);
      setCurrentWord(newWord);
      let tempScore = currentWordScore + data.value;
      setCurrentWordScore(tempScore);
    }
  };

  const getEventZone = (mousePosition: number) => {
    let index = -1;
    if (mousePosition / 20 >= 1 && mousePosition / 20 <= 4) index = 0;
    else if (mousePosition / 20 >= 5 && mousePosition / 20 <= 8) index = 1;
    else if (mousePosition / 20 >= 9 && mousePosition / 20 <= 12) index = 2;
    else if (mousePosition / 20 >= 14 && mousePosition / 20 <= 17) index = 3;
    else index = -1;
    return index;
  };

  const getBoxIdByEventCoords = (x: number, y: number) => {
    if (x == -1 || y == -1) return null;
    return x * 4 + y;
  };

  const checkWordValidity = (word: string) => {
    let tempWordsList = validWordsData;
    let foundIndex = tempWordsList.findIndex((list) => list.value === word);

    if (foundIndex != -1) {
      if (!tempWordsList[foundIndex].isIncluded) {
        tempWordsList[foundIndex].isIncluded = true;
        setValidWordsData(tempWordsList);
        if (gameContext) gameContext.updateWordsList(tempWordsList);
        return 1;
      } else return 2;
    }
    return 0;
  };

  /**
   * Checks if current boxId is valid (It should be adjacent tile of previous boxId always)
   */
  const isBoxIdValid = (id: number) => {
    let defArray = [-1, 1, -3, -4, -5, 3, 4, 5];
    if (selectedBoxId == -1) return true;
    for (let index = 0; index < defArray.length; index++) {
      let validId = selectedBoxId - defArray[index];
      if (selectedBoxId % 4 == 0 && id % 4 == 3) return false;
      if (selectedBoxId % 4 == 3 && id % 4 == 0) return false;
      if (validId >= 0 && id == validId) return true;
    }
    return false;
  };

  const handelTouchMove = (e: GestureResponderEvent) => {
    if (deviceDimension) {
      let boxX = Math.floor(e.nativeEvent.pageY - deviceDimension.y);
      let boxY = Math.floor(e.nativeEvent.pageX - deviceDimension.x);
      if (
        boxX < 0 ||
        boxX > deviceDimension.width ||
        boxY < 0 ||
        boxY > deviceDimension.height
      ) {
        if (!isMouseOut && currentWord.length > 0) {
          isMouseOut = true;
          setTimeout(() => {
            handleTouchEnd();
          }, 10);
        }
        return;
      }
      let indexX = getEventZone(boxX);
      let indexY = getEventZone(boxY);
      let boxId = getBoxIdByEventCoords(indexX, indexY);
      if (boxId != null) {
        if (!isBoxIdValid(boxId)) return;
        setSelectedBoxId(boxId);
        updateState(boxId);
      }
    }
  };

  useEffect(() => {}, [gameData]);

  const handleTouchEnd = () => {
    if (currentWord.length < 3) {
      setTimeout(() => {
        setCurrentWordScore(0);
        setCurrentWord("");
        setSelectedBoxId(-1);
      }, 5);
      setTimeout(() => {
        setGameData(originalData);
      }, 400);
      return;
    }
    let validStatus = checkWordValidity(currentWord);
    let tempScore = gameScore;
    let tempData = gameData;

    tempData.map((data) => {
      if (data.isIncluded) {
        if (validStatus == 1) tempData[data.id].tileState = CORRECT;
        else if (validStatus == 2) tempData[data.id].tileState = ALREADY;
        else tempData[data.id].tileState = WRONG;
      }
    });

    setGameData(tempData);
    if (validStatus == 0) playInvalidWordSound();
    if (validStatus == 1) {
      if (currentWordScore >= 16 || currentWord.length > 5) {
        playBonusSound();
        setIsItAwesome(true);
      } else playAcceptedWordSound();
    }
    if (validStatus == 2) playAlreadyPresentSound();

    setTimeout(() => {
      if (validStatus == 1) {
        tempScore += currentWordScore;

        let tempFoundWords = foundWords;
        tempFoundWords.unshift({
          score: currentWordScore,
          value: currentWord,
        });
        setFoundWords(tempFoundWords);
      }
      console.log(currentWord);
      console.log("Score: ", currentWordScore);

      setGameScore(tempScore);
      if (gameContext) gameContext.updateScore(tempScore);
      setCurrentWordScore(0);
      setCurrentWord("");
      setSelectedBoxId(-1);
    }, 5);

    setTimeout(() => {
      setIsItAwesome(false);
      setGameData(originalData);
    }, 400);
  };

  return (
    <View style={tw`flex justify-center items-center flex-col w-full h-full`}>
      <View
        style={[
          isItAwesome
            ? {
                opacity: 1,
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: 10,
              }
            : { opacity: 0, zIndex: 0 },
          tw`absolute w-full h-full flex justify-center items-center rounded-lg`,
        ]}
      >
        <Text style={[styles.awesomeText, tw`text-3xl font-bold text-white`]}>
          Awesome!
        </Text>
      </View>

      <ScoreDisplay
        word={currentWord}
        score={gameScore}
        totalWords={solutionData.length || 0}
        foundWords={foundWords.length}
      />

      <View
        onLayout={({ nativeEvent }) => {
          setDeviceDimension(nativeEvent.layout);
        }}
        onTouchMove={(e) => {
          handelTouchMove(e);
        }}
        onTouchEnd={() => {
          if (!isMouseOut) {
            setTimeout(() => {
              handleTouchEnd();
            }, 10);
          }
        }}
        style={tw`flex flex-row justify-center items-center w-full flex-wrap`}
      >
        {gameData.map((data, index) => {
          return <GameBox key={data.id} {...data} />;
        })}
      </View>
      <WordDisplay foundWords={foundWords} />
    </View>
  );
}

const styles = StyleSheet.create({
  awesomeText: {
    textShadowColor: "#FC0",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },
});

export default Game;
