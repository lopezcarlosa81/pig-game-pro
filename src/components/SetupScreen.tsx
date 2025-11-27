import { useState } from 'react';
import './SetupScreen.css';

interface SetupScreenProps {
    onStartGame: (names: string[]) => void;
}

export const SetupScreen = ({ onStartGame }: SetupScreenProps) => {
    const [playerCount, setPlayerCount] = useState(2);
    const [names, setNames] = useState<string[]>(['Player 1', 'Player 2']);

    const handleCountChange = (count: number) => {
        setPlayerCount(count);
        setNames((prev) => {
            const newNames = [...prev];
            if (count > prev.length) {
                for (let i = prev.length; i < count; i++) {
                    newNames.push(`Player ${i + 1}`);
                }
            } else {
                newNames.length = count;
            }
            return newNames;
        });
    };

    const handleNameChange = (index: number, value: string) => {
        const newNames = [...names];
        newNames[index] = value;
        setNames(newNames);
    };

    return (
        <div className="setup-screen">
            <h1 className="title">Pig Game Pro</h1>

            <div className="setup-card">
                <h2>Game Setup</h2>

                <div className="form-group">
                    <label>Number of Players</label>
                    <div className="player-count-selector">
                        {[2, 3, 4, 5, 6].map((num) => (
                            <button
                                key={num}
                                className={`count-btn ${playerCount === num ? 'active' : ''}`}
                                onClick={() => handleCountChange(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="names-list">
                    {names.map((name, index) => (
                        <div key={index} className="form-group">
                            <label>Player {index + 1} Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                placeholder={`Player ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <button className="btn-start" onClick={() => onStartGame(names)}>
                    Start Game
                </button>
            </div>
        </div>
    );
};
