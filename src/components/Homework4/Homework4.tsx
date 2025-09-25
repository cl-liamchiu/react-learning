import { HWData } from './HomeworkContent';
import CanvasImageEditor from './CanvasImageEditor';
import HomeworkDescription from '../HomeworkDescription/HomeworkDescription';

const Homework4 = () => {
  return (
    <div>
      <HomeworkDescription {...HWData} />
      <CanvasImageEditor />
    </div>
  );
};

export default Homework4;
