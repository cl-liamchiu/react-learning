import React from 'react';
import './Card.css';
import type { CardItem } from '../ReactIntroPage/CardContent';

const Card: React.FC<CardItem> = ({ title, content }) => (
  <div className="card-center">
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <div className="content">{content}</div>
    </div>
  </div>
);

export default Card;
