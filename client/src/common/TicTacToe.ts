export enum GAME_STATES {
    "not_started",
    "in_progress",
    "over"
  };

export interface Games{
    Game: Game[]
  }

export interface Users{
    User: User[]
  }
  
export interface Game{
    gameId?: number;
    grid?: number[];
    players: User[]
    current_turn?: User;
    state?: GAME_STATES;
}

export interface User{
    id: string;
    activeGameId?: string;
    name: string;
}

export interface MoveRequest{
    cell: number
}