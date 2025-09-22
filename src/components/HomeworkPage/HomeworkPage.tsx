import { useParams } from 'react-router';
import Homework1 from '../Homework1/Homework1';
import Homework2 from '../Homework2/Homework2';

const HomeworkPage = () => {
  const { id } = useParams();

  if (id === '1') return <Homework1 />;
  if (id === '2') return <Homework2 />;

  return null;
};

export default HomeworkPage;
