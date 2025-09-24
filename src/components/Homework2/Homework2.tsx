import { useState, useRef } from 'react';
import { HWData } from './HomeworkContent';
import HomeworkDescription from '../HomeworkDescription/HomeworkDescription';
import './Homework2.css';

const Homework2: React.FC = () => {
  const [components, setComponents] = useState<number[]>([]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const addComponent = () => {
    const nextNum = components.length > 0 ? Math.max(...components) + 1 : 1;
    setComponents([...components, nextNum]);
  };

  const removeComponent = (index?: number) => {
    if (typeof index === 'number') {
      setComponents((prev) => prev.filter((_, i) => i !== index));
    } else {
      setComponents((prev) => prev.slice(0, -1));
    }
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const dragFrom = dragItem.current;
    const dragTo = dragOverItem.current;
    if (dragFrom === null || dragTo === null || dragFrom === dragTo) return;
    const updated = [...components];
    const [removed] = updated.splice(dragFrom, 1);
    updated.splice(dragTo, 0, removed);
    setComponents(updated);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div>
      <HomeworkDescription {...HWData} />
      <div>
        <button className="hw2-btn" onClick={addComponent}>
          Add Component
        </button>
        <button className="hw2-btn remove" onClick={() => removeComponent()}>
          Remove Component
        </button>
        <div className="component-list">
          {components.map((comp, index) => (
            <div
              key={index}
              className="hw2-component"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              Component {comp}
              <button
                className="hw2-btn remove"
                style={{
                  float: 'right',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.9rem',
                  marginRight: 0,
                }}
                onClick={() => removeComponent(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homework2;
