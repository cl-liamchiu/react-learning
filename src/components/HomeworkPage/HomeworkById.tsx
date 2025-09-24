import { useParams } from 'react-router';
import Homework1 from '../Homework1/Homework1';
import Homework2 from '../Homework2/Homework2';
import Homework3 from '../Homework3/Homework3';

const HomeworkPage = () => {
  const { id } = useParams();

  return (
    <div>
      {id === '1' && <Homework1 />}
      {id === '2' && <Homework2 />}
      {id === '3' && <Homework3 />}
      {id === '4' && <div>Homework 4: (To be implemented)</div>}
      {id === '5' && <div>Homework 5: (To be implemented)</div>}
    </div>
  );
};

export default HomeworkPage;
