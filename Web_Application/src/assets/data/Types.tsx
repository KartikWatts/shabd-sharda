export type DataProps = {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	isMouseDown: boolean;
	selectedBoxId: number;
	updateState: (id: number) => void;
	updateSelctedBoxId: (id: number) => void;
	endWord: () => void;
};

export type WordProps = {
	word: string;
	score: number;
};
