
const levels = ["Beginner", "Intermediate", "Advanced", "A1", "A2", "B1", "B2", "C1"];

const ListeningLevelSelector = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
    <select value={value} onChange={e => onChange(e.target.value)} className="border rounded px-2 py-1">
        {levels.map(level => (
            <option key={level} value={level}>{level}</option>
        ))}
    </select>
);

export default ListeningLevelSelector; 