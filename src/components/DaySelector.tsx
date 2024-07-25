import React from 'react';

interface DaySelectorProps {
  onSelectDay: (day: number) => void;
  onClose: () => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ onSelectDay, onClose }) => {
  const [day, setDay] = React.useState<number>(0);

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(parseInt(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSelectDay(day);
    onClose();
  };

  return (
    <div style={{ position: 'absolute', top: '10%', left: '10%', background: 'white', padding: '10px', border: '1px solid black' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Select Day:
          <input type="number" value={day} onChange={handleDayChange} />
        </label>
        <button type="submit">Go</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DaySelector;
