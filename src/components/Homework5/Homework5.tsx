import { HWData } from './HomeworkContent';
import HomeworkDescription from '../HomeworkDescription/HomeworkDescription';
import ImageZoomDemo from './ImageZoomDemo';

const Homework5 = () => {
  return (
    <div>
      <HomeworkDescription {...HWData} />
      <ImageZoomDemo />
    </div>
  );
};

export default Homework5;
