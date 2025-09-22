import React from 'react';
import Card from '../Card/Card';
import { cardData } from './CardContent';

const RouteInfo: React.FC = () => {
  return (
    <div>
      <h2>React Router 介紹</h2>
      {cardData.map((card, idx) => (
        <Card key={idx} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default RouteInfo;
