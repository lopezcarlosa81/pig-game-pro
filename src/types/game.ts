export type GameStatus = 'setup' | 'playing' | 'finished';

export interface Player {
    id: number;
    name: string;
    totalScore: number;
    isActive: boolean;
}

export interface GameState {
    status: GameStatus;
    players: Player[];
    currentTurnScore: number;
    activePlayerIndex: number;
    diceValue: number | null;
    winner: Player | null;
    isRolling: boolean;
}
