import Card from '../Card/Card';
import { cardData } from './ImageManipulationContent';
import * as ImageManipulationExamples from './ImageManipulationExamples';

const ImageManipulation = () => {
  return (
    <div>
      <h2>Image Manipulation</h2>
      <ImageManipulationExamples.OriginExample />
      {cardData.map((card, idx) => (
        <Card key={idx} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default ImageManipulation;
