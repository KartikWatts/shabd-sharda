import React, { useContext } from "react";
import { GameActionType } from "./assets/data/Interfaces";
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
						onClick={() => {
							if (gameContext) {
								gameContext.toggleGameState();
							}
						}}
					>
						start game
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
