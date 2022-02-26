import React from "react";

type WordProps = {
	word: string;
};

function WordDisplay(props: WordProps) {
	return (
		<div className="h-2 mb-4">
			{props.word != "" && (
				<div className="bg-white px-2">
					<span className="tracking-widest text-lg">
						{props.word}
					</span>
				</div>
			)}
		</div>
	);
}

export default WordDisplay;
