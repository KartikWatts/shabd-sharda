export interface Data {
	id: number;
	letter: string;
	value: number;
	isIncluded: boolean;
	tileState: number;
}

export interface WordsData {
	value: string;
	isIncluded: boolean;
}

export interface Events {
	id: number;
	order: number;
}

export interface LayoutData {
	height: number;
	width: number;
	x: number;
	y: number;
}
