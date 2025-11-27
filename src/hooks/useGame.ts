import { useState, useCallback } from 'react';
import type { GameState, Player } from '../types/game';

const WINNING_SCORE = 100;

const INITIAL_STATE: GameState = {
    status: 'setup',
    players: [],
    currentTurnScore: 0,
    activePlayerIndex: 0,
    diceValue: null,
    winner: null,
    isRolling: false,
};

export const useGame = () => {
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

    const setupGame = useCallback((playerNames: string[]) => {
        const newPlayers: Player[] = playerNames.map((name, index) => ({
            id: index + 1,
            name: name || `Player ${index + 1}`,
            totalScore: 0,
            isActive: index === 0,
        }));

        setGameState({
            ...INITIAL_STATE,
            status: 'playing',
            players: newPlayers,
            activePlayerIndex: 0,
        });
    }, []);

    const rollDice = useCallback(() => {
        if (gameState.status !== 'playing' || gameState.isRolling) return;

        // Start rolling animation
        setGameState(prev => ({ ...prev, isRolling: true }));

        // Wait for animation
        setTimeout(() => {
            const dice = Math.floor(Math.random() * 6) + 1;

            setGameState((prev) => {
                // If rolled a 1
                if (dice === 1) {
                    const nextPlayerIndex = (prev.activePlayerIndex + 1) % prev.players.length;

                    const updatedPlayers = prev.players.map((p, i) => ({
                        ...p,
                        isActive: i === nextPlayerIndex
                    }));

                    return {
                        ...prev,
                        diceValue: 1,
                        currentTurnScore: 0,
                        activePlayerIndex: nextPlayerIndex,
                        players: updatedPlayers,
                        isRolling: false,
                    };
                }

                // If rolled 2-6
                return {
                    ...prev,
                    diceValue: dice,
                    currentTurnScore: prev.currentTurnScore + dice,
                    isRolling: false,
                };
            });
        }, 800); // 800ms animation duration
    }, [gameState.status, gameState.isRolling]);

    const holdScore = useCallback(() => {
        if (gameState.status !== 'playing') return;

        setGameState((prev) => {
            const activePlayer = prev.players[prev.activePlayerIndex];
            const newTotalScore = activePlayer.totalScore + prev.currentTurnScore;

            // Update the active player's score
            const updatedPlayers = [...prev.players];
            updatedPlayers[prev.activePlayerIndex] = {
                ...activePlayer,
                totalScore: newTotalScore
            };

            // Check for win
            if (newTotalScore >= WINNING_SCORE) {
                return {
                    ...prev,
                    players: updatedPlayers,
                    winner: updatedPlayers[prev.activePlayerIndex],
                    status: 'finished',
                    diceValue: null,
                };
            }

            // Switch player
            const nextPlayerIndex = (prev.activePlayerIndex + 1) % prev.players.length;

            // Update active status
            updatedPlayers[prev.activePlayerIndex].isActive = false;
            updatedPlayers[nextPlayerIndex].isActive = true;

            return {
                ...prev,
                players: updatedPlayers,
                currentTurnScore: 0,
                activePlayerIndex: nextPlayerIndex,
                diceValue: null,
            };
        });
    }, [gameState.status]);

    const resetGame = useCallback(() => {
        // Restart with same players
        setGameState((prev) => ({
            ...INITIAL_STATE,
            status: 'playing',
            players: prev.players.map((p, i) => ({
                ...p,
                totalScore: 0,
                isActive: i === 0
            })),
            activePlayerIndex: 0,
        }));
    }, []);

    const backToSetup = useCallback(() => {
        setGameState(INITIAL_STATE);
    }, []);

    return {
        gameState,
        setupGame,
        rollDice,
        holdScore,
        resetGame,
        backToSetup
    };
};
