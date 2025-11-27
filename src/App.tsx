import { useGame } from './hooks/useGame';
import { PlayerCard } from './components/PlayerCard';
import { Dice } from './components/Dice';
import { Controls } from './components/Controls';
import { WinnerModal } from './components/WinnerModal';
import './App.css';

function App() {
  const { gameState, rollDice, holdScore, resetGame } = useGame();
  const { players, activePlayerId, diceValue, winner, isPlaying } = gameState;

  return (
    <main className="game-board">
      <PlayerCard
        player={players[1]}
        currentScore={activePlayerId === 1 ? gameState.currentTurnScore : 0}
        isWinner={winner === 1}
      />

      <div className="center-controls">
        <Dice value={diceValue} />
        <Controls
          onRoll={rollDice}
          onHold={holdScore}
          onNewGame={resetGame}
          isPlaying={isPlaying}
        />
      </div>

      <PlayerCard
        player={players[2]}
        currentScore={activePlayerId === 2 ? gameState.currentTurnScore : 0}
        isWinner={winner === 2}
      />

      <WinnerModal
        winner={winner ? players[winner] : null}
        onNewGame={resetGame}
      />
    </main>
  );
}

export default App;

