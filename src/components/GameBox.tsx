import React, { useState } from "react";
import { DataProps } from "../assets/data/Types";

function GameBox(props: DataProps) {
	// const [isTouchActive, setIsTouchActive] = useState(false);
	const [eventOrder, setEventOrder] = useState(0);

	// document.addEventListener("touchstart", () => {
	// 	setIsTouchActive(true);
	// });
	// document.addEventListener("touchend", () => {
	// 	setIsTouchActive(false);
	// });

	const getEventZone = (mousePosition: number) => {
		let index = -1;
		if (mousePosition / 20 >= 1 && mousePosition / 20 <= 4) index = 0;
		else if (mousePosition / 20 >= 5 && mousePosition / 20 <= 8) index = 1;
		else if (mousePosition / 20 >= 9 && mousePosition / 20 <= 12) index = 2;
		else if (mousePosition / 20 >= 14 && mousePosition / 20 <= 17)
			index = 3;
		else index = -1;
		return index;
	};

	const getBoxIdByEventCoords = (x: number, y: number) => {
		if (x == -1 || y == -1) return null;
		return x * 4 + y;
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
							currentBox.classList.remove("bg-blue-400");
							currentBox.classList.remove("hover:bg-violet-400");
							currentBox.classList.add("bg-teal-200");
							props.updateState(props.id);
						}
					}
				}
			}}
			onTouchMove={(event) => {
				let gameBox: HTMLElement | null =
					document.querySelector(".game-box");
				if (gameBox) {
					let mouseX = event.touches[0].clientX - gameBox.offsetLeft,
						mouseY = event.touches[0].clientY - gameBox.offsetTop;
					// console.log(mouseX);
					let indexX = getEventZone(mouseY);
					let indexY = getEventZone(mouseX);
					let boxId = getBoxIdByEventCoords(indexX, indexY);
					if (boxId != null) {
						// console.log(boxId);
						let currentBox: HTMLElement | null =
							document.getElementById(`box-${boxId}`);
						if (currentBox) {
							currentBox.classList.remove("bg-blue-400");
							currentBox.classList.remove("hover:bg-violet-400");
							currentBox.classList.add("bg-teal-200");
							currentBox.classList.add("selected-box");
							currentBox.setAttribute(
								"data-order",
								eventOrder.toString()
							);
							setEventOrder(eventOrder + 1);
							// props.updateState(boxId);
						}
					}
				}
			}}
			// onTouchEnd={() => {
			// 	let selectedBoxes = document.querySelectorAll(".selected-box");
			// 	let selectedBoxesArray =
			// 		Array.prototype.slice.call(selectedBoxes);
			// 	let boxEvents: Events[] = [];
			// 	selectedBoxesArray.map((box) => {
			// 		let id = box.getAttribute("data-id");
			// 		let order = box.getAttribute("data-order");
			// 		boxEvents.push({ id, order: parseInt(order) });
			// 	});
			// 	boxEvents.sort((a, b) => (a.order > b.order ? 1 : -1));
			// 	console.log(boxEvents);
			// 	boxEvents.map((box) => {
			// 		console.log(box.id);
			// 	});
			// }}
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
