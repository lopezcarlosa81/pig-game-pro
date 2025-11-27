import './Controls.css';

interface ControlsProps {
    onRoll: () => void;
    onHold: () => void;
    onNewGame: () => void;
    isPlaying: boolean;
}

export const Controls = ({ onRoll, onHold, onNewGame, isPlaying }: ControlsProps) => {
    return (
        <div className="controls-container">
            <button className="btn btn-new" onClick={onNewGame}>
                🔄 New Game
            </button>

            <div className="game-actions">
                <button className="btn btn-roll" onClick={onRoll} disabled={!isPlaying}>
                    🎲 Roll Dice
                </button>
                <button className="btn btn-hold" onClick={onHold} disabled={!isPlaying}>
                    📥 Hold
                </button>
            </div>
        </div>
    );
};
