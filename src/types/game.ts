export type PlayerId = 1 | 2;

export interface Player {
    id: PlayerId;
    name: string;
    totalScore: number;
    isActive: boolean;
}

export interface GameState {
    players: {
        [key in PlayerId]: Player;
    };
    currentTurnScore: number;
    activePlayerId: PlayerId;
    diceValue: number | null; // null if game hasn't started or between turns
    winner: PlayerId | null;
    isPlaying: boolean;
}
