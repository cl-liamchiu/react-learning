import { useParams } from 'react-router';
import Homework1 from '../Homework1/Homework1';
import Homework2 from '../Homework2/Homework2';
import Homework3 from '../Homework3/Homework3';
import Homework4 from '../Homework4/Homework4';
import Homework5 from '../Homework5/Homework5';

const HomeworkPage = () => {
  const { id } = useParams();

  return (
    <div>
      {id === '1' && <Homework1 />}
      {id === '2' && <Homework2 />}
      {id === '3' && <Homework3 />}
      {id === '4' && <Homework4 />}
      {id === '5' && <Homework5 />}
    </div>
  );
};

export default HomeworkPage;
