import type React from 'react';
import './HomeworkDescription.css';

interface HomeworkDescriptionProps {
  title: string;
  contentBasic: React.ReactNode;
  contentAdvanced: React.ReactNode;
}

const HomeworkDescription: React.FC<HomeworkDescriptionProps> = ({
  title,
  contentBasic,
  contentAdvanced,
}) => {
  return (
    <div className="homework-description-container">
      <h2 className="homework-title">{title}</h2>
      <div className="homework-content">
        <span className="homework-highlight">Basic requirement:</span>
        {contentBasic}
        <span className="homework-highlight">Advanced:</span>
        {contentAdvanced}
      </div>
    </div>
  );
};

export default HomeworkDescription;
