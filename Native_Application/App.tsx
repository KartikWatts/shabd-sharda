import React from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { GameProvider } from "./contexts/GameContext";
import GameWrapper from "./components/GameWrapper";

NavigationBar.setBackgroundColorAsync("rgb(71, 85, 105)");
NavigationBar.setBehaviorAsync("overlay-swipe");
NavigationBar.setVisibilityAsync("hidden");

export default function App() {
  return (
    <GameProvider>
      <GameWrapper />
      <StatusBar hidden={true} />
    </GameProvider>
  );
}
