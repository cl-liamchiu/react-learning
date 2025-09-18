import React, { useState } from 'react';
import HomeworkDescription from '../HomeworkDescription.tsx/HomeworkDescription';
import { HWData } from './HomeworkContent';

const Homework1: React.FC= () => {
  const [mode, setMode] = useState<'number' | 'alpha'>('number');
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [error, setError] = useState('');

  const numberRegex = /^\d*$/;
  const alphaRegex = /^[a-zA-Z]*$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (mode === 'number') {
      if (numberRegex.test(value)) {
        setInputValue(value);
        setError('');
      } else {
        setError('Only numbers are allowed.');
      }
    } else {
      if (alphaRegex.test(value)) {
        setInputValue(value);
        setError('');
      } else {
        setError('Only alphabets are allowed.');
      }
    }
  };

  return (
    <div>
      <HomeworkDescription {...HWData} />
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            checked={mode === 'number'}
            onChange={() => { setInputValue(''); setSubmittedValue(''); setMode('number'); }}
          />
          Only Numbers
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            checked={mode === 'alpha'}
            onChange={() => { setInputValue(''); setSubmittedValue(''); setMode('alpha'); }}
          />
          Only Alphabets
        </label>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={mode === 'number' ? 'Enter numbers only' : 'Enter alphabets only'}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button
        onClick={() => setSubmittedValue(inputValue)}
        style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        >
        Send
      </button>
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
        )}
      <div>
        {submittedValue && <p>Welcome: {submittedValue}</p>}
      </div>
    </div>
  );
};

export default Homework1;
