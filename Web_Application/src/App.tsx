import React, { useContext } from "react";
import Game from "./containers/Game";
import { GameContext } from "./contexts/GameContext";

function App() {
	const gameContext = useContext(GameContext);

	return (
		<div className="w-screen h-screen bg-slate-600 flex justify-center items-center flex-col">
			{gameContext && gameContext.isGameOn ? (
				<Game />
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
	);
}

export default App;
