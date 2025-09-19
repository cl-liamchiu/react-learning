import React from 'react';
import reactLogo from '../../assets/react.svg';
import './ReactInfo.css';
import Card from '../Card/Card';
import { cardData } from './CardContent';

const ReactInfo: React.FC = () => (
  <div>
    <h2>React 簡介</h2>
    <img src={reactLogo} className="logo" alt="React logo" />
    {cardData.map((card, idx) => (
      <Card key={idx} title={card.title} content={card.content} />
    ))}
  </div>
);

export default ReactInfo;
