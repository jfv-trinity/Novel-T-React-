export enum GAME_STATES {
    "not_started",
    "in_progress",
    "over"
  };

export interface Game{
    gameId?: string;
    grid?: number[];
    players: User[];
    current_turn?: User;
    state?: GAME_STATES;
    hostId?: string;
}

export interface User{
    id: string;
    activeGameId?: string;
    name: string;
}

export interface Games extends Array<Game>{}
export interface Users extends Array<User>{}

export interface MoveRequest{
    cell: number
}