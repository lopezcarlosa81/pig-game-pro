import type { Player } from '../types/game';
import './WinnerModal.css';

interface WinnerModalProps {
    winner: Player | null;
    onNewGame: () => void;
}

export const WinnerModal = ({ winner, onNewGame }: WinnerModalProps) => {
    if (!winner) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>🎉 We have a Winner! 🎉</h2>
                <p className="winner-name">{winner.name}</p>
                <p className="winner-score">Score: {winner.totalScore}</p>
                <button className="btn btn-primary" onClick={onNewGame}>
                    Play Again
                </button>
            </div>
        </div>
    );
};
