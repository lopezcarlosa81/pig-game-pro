import './Dice.css';

interface DiceProps {
    value: number | null;
    isRolling?: boolean;
}

export const Dice = ({ value, isRolling }: DiceProps) => {
    if (!value && !isRolling) return <div className="dice-placeholder" />;

    return (
        <div className={`dice ${value ? `dice-${value}` : ''} ${isRolling ? 'rolling' : ''}`}>
            {Array.from({ length: value || 0 }).map((_, i) => (
                <span key={i} className="dot" />
            ))}
        </div>
    );
};
