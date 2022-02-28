export type DataProps = {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	isMouseDown: boolean;
	updateState: (id: number) => void;
	endWord: () => void;
};

export type WordProps = {
	word: string;
	score: number;
};
