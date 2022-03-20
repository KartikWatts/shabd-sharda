import React, { useContext } from "react";
import { json } from "stream/consumers";
import NavBar from "./components/NavBar";
import UserAuth from "./components/UserAuth";
import Game from "./containers/Game";
import ResultDisplay from "./containers/ResultDisplay";
import { GameContext } from "./contexts/GameContext";

function App() {
	const gameContext = useContext(GameContext);

	return (
		<>
			{/* <UserAuth /> */}
			<div className="w-screen h-screen bg-slate-600 flex justify-center items-center flex-col">
				<NavBar />
				{gameContext && gameContext.isGameOn ? (
					<Game />
				) : gameContext && gameContext.wordsList.length > 0 ? (
					<ResultDisplay
						gameArray={gameContext.gameArray}
						wordsList={gameContext.wordsList}
						score={gameContext.score}
					/>
				) : (
					<div>
						<button
							className="bg-yellow-300 p-8 border-4 hover:bg-amber-300 border-blue-400 rounded-lg text-blue-600 transition-all text-2xl drop-shadow-xl hover:drop-shadow-2xl font-bold hover:scale-105"
							onClick={() => {
								if (gameContext) {
									gameContext.toggleGameState();
								}
							}}
						>
							Start Game
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
