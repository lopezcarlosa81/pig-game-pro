import { useState, useCallback } from 'react';
import type { GameState } from '../types/game';

const WINNING_SCORE = 100;

const INITIAL_STATE: GameState = {
    players: {
        1: { id: 1, name: 'Player 1', totalScore: 0, isActive: true },
        2: { id: 2, name: 'Player 2', totalScore: 0, isActive: false },
    },
    currentTurnScore: 0,
    activePlayerId: 1,
    diceValue: null,
    winner: null,
    isPlaying: true,
};

export const useGame = () => {
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

    const rollDice = useCallback(() => {
        if (gameState.winner) return;

        const dice = Math.floor(Math.random() * 6) + 1;

        setGameState((prev) => {
            // If rolled a 1
            if (dice === 1) {
                return {
                    ...prev,
                    diceValue: 1,
                    currentTurnScore: 0,
                    activePlayerId: prev.activePlayerId === 1 ? 2 : 1,
                    players: {
                        ...prev.players,
                        1: { ...prev.players[1], isActive: prev.activePlayerId === 2 },
                        2: { ...prev.players[2], isActive: prev.activePlayerId === 1 },
                    },
                };
            }

            // If rolled 2-6
            return {
                ...prev,
                diceValue: dice,
                currentTurnScore: prev.currentTurnScore + dice,
            };
        });
    }, [gameState.winner]);

    const holdScore = useCallback(() => {
        if (gameState.winner) return;

        setGameState((prev) => {
            const activePlayer = prev.players[prev.activePlayerId];
            const newTotalScore = activePlayer.totalScore + prev.currentTurnScore;

            // Check for win
            if (newTotalScore >= WINNING_SCORE) {
                return {
                    ...prev,
                    players: {
                        ...prev.players,
                        [prev.activePlayerId]: { ...activePlayer, totalScore: newTotalScore },
                    },
                    winner: prev.activePlayerId,
                    isPlaying: false,
                    diceValue: null,
                };
            }

            // Switch player
            return {
                ...prev,
                players: {
                    ...prev.players,
                    [prev.activePlayerId]: { ...activePlayer, totalScore: newTotalScore, isActive: false },
                    [prev.activePlayerId === 1 ? 2 : 1]: { ...prev.players[prev.activePlayerId === 1 ? 2 : 1], isActive: true },
                },
                currentTurnScore: 0,
                activePlayerId: prev.activePlayerId === 1 ? 2 : 1,
                diceValue: null,
            };
        });
    }, [gameState.winner]);

    const resetGame = useCallback(() => {
        setGameState(INITIAL_STATE);
    }, []);

    return {
        gameState,
        rollDice,
        holdScore,
        resetGame,
    };
};
