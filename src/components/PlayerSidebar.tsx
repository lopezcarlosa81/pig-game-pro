import type { Player } from '../types/game';
import { PlayerCard } from './PlayerCard';
import './PlayerSidebar.css';

interface PlayerSidebarProps {
    players: Player[];
    activePlayerIndex: number;
    currentTurnScore: number;
    winner: Player | null;
}

export const PlayerSidebar = ({ players, activePlayerIndex, currentTurnScore, winner }: PlayerSidebarProps) => {
    return (
        <div className="player-sidebar">
            {players.map((player, index) => (
                <div key={player.id} className="sidebar-item">
                    <PlayerCard
                        player={player}
                        currentScore={index === activePlayerIndex ? currentTurnScore : 0}
                        isWinner={winner?.id === player.id}
                    />
                </div>
            ))}
        </div>
    );
};
