export interface Data {
  id: number;
  letter: string;
  value: number;
  isIncluded: boolean;
}

export interface WordsData {
  value: string;
  isIncluded: boolean;
}

export interface Events {
  id: number;
  order: number;
}

export interface GameState {
  isGameOn: boolean;
  gameArray: Data[];
  wordsList: WordsData[];
  score: number;
}
export interface UserState {
  uid: string | null;
  displayName: string;
  photoURL: string;
  providerId: string | null;
}

export interface GameAction {
  type: string;
  payload: any;
}
export interface UserAction {
  type: string;
  payload: any;
}

export interface FoundWords {
  score: number;
  value: string;
}
