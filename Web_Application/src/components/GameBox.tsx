import React from "react";
import { DataProps } from "../assets/data/Types";

function GameBox(props: DataProps) {
	/**
	 * Checks if current boxId is valid (It should be adjacent tile of previous boxId always)
	 */
	const isBoxIdValid = (id: number) => {
		let defArray = [-1, 1, -3, -4, -5, 3, 4, 5];
		if (props.selectedBoxId == -1) return true;
		for (let index = 0; index < defArray.length; index++) {
			let validId = props.selectedBoxId - defArray[index];
			if (validId > 0 && id == validId) return true;
		}
		return false;
	};

	return (
		<div
			id={`box-${props.id.toString()}`}
			data-id={props.id}
			onMouseUp={props.endWord}
			onMouseMove={(event) => {
				if (props.isMouseDown) {
					let currentBox: HTMLElement | null =
						document.getElementById(`box-${props.id}`);
					if (currentBox) {
						// CHECK IF LOCATION OF MOUSE POINTER IS WITHIN 25% to 75% VERTICALLY AND HORIZONTALLY
						let boxX = currentBox.offsetWidth;
						let boxY = currentBox.offsetHeight;

						let mouseX = event.clientX - currentBox.offsetLeft,
							mouseY = event.clientY - currentBox.offsetTop;

						if (
							mouseX > boxX / 10 &&
							mouseX < (8.5 * boxX) / 10 &&
							mouseY > boxY / 10 &&
							mouseY < (8.5 * boxY) / 10
						) {
							if (!isBoxIdValid(props.id)) return;
							props.updateSelctedBoxId(props.id);

							currentBox.classList.remove("bg-blue-400");
							currentBox.classList.remove("hover:bg-violet-400");
							currentBox.classList.add("bg-teal-200");
							props.updateState(props.id);
						}
					}
				}
			}}
			className={
				"game-box transition duration-300 w-20 h-20 sm:w-28 sm:h-28 bg-blue-400 rounded-md drop-shadow-md flex justify-center items-center text-4xl sm:text-5xl select-none hover:bg-violet-400"
			}
		>
			<span className="absolute top-0 left-1 sm:top-0.5 sm:left-1 text-sm sm:text-xl">
				{props.value}
			</span>
			{props.letter}
		</div>
	);
}

export default GameBox;
