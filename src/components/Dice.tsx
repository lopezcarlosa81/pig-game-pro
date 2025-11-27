import './Dice.css';

interface DiceProps {
    value: number | null;
}

export const Dice = ({ value }: DiceProps) => {
    if (!value) return <div className="dice-placeholder" />;

    return (
        <div className={`dice dice-${value}`}>
            {Array.from({ length: value }).map((_, i) => (
                <span key={i} className="dot" />
            ))}
        </div>
    );
};
