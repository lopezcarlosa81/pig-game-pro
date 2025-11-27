import type { Player } from '../types/game';
import './PlayerCard.css';

interface PlayerCardProps {
    player: Player;
    currentScore: number;
    isWinner: boolean;
}

export const PlayerCard = ({ player, currentScore, isWinner }: PlayerCardProps) => {
    return (
        <div className={`player-card ${player.isActive ? 'active' : ''} ${isWinner ? 'winner' : ''}`}>
            <h2 className="player-name">{player.name}</h2>
            <div className="total-score">{player.totalScore}</div>

            <div className="current-box">
                <div className="current-label">Current</div>
                <div className="current-score">{player.isActive ? currentScore : 0}</div>
            </div>
        </div>
    );
};
