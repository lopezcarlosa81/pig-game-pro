import { useGame } from './hooks/useGame';
import { PlayerSidebar } from './components/PlayerSidebar';
import { Dice } from './components/Dice';
import { Controls } from './components/Controls';
import { WinnerModal } from './components/WinnerModal';
import { SetupScreen } from './components/SetupScreen';
import './App.css';

function App() {
  const { gameState, setupGame, rollDice, holdScore, resetGame, backToSetup } = useGame();
  const { players, activePlayerIndex, diceValue, winner, status, currentTurnScore } = gameState;

  if (status === 'setup') {
    return <SetupScreen onStartGame={setupGame} />;
  }

  const activePlayer = players[activePlayerIndex];
  const currentTotal = activePlayer?.totalScore || 0;

  let riskLevel: 'normal' | 'warning' | 'danger' = 'normal';
  if (currentTotal >= 90) riskLevel = 'danger';
  else if (currentTotal >= 80) riskLevel = 'warning';

  return (
    <main className="game-board">
      <PlayerSidebar
        players={players}
        activePlayerIndex={activePlayerIndex}
        currentTurnScore={currentTurnScore}
        winner={winner}
      />

      <div className="game-area">
        <div className="center-controls">
          <Dice
            value={diceValue}
            isRolling={gameState.isRolling}
            riskLevel={riskLevel}
          />
          <Controls
            onRoll={rollDice}
            onHold={holdScore}
            onNewGame={backToSetup}
            isPlaying={status === 'playing' && !gameState.isRolling}
          />
        </div>
      </div>

      <WinnerModal
        winner={winner}
        onNewGame={resetGame}
      />
    </main>
  );
}

export default App;
