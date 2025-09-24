import { HWData } from './HomeworkContent';
import HomeworkDescription from '../HomeworkDescription.tsx/HomeworkDescription';
import { Link } from 'react-router';

const Homework3 = () => {
  return (
    <div>
      <HomeworkDescription {...HWData} />
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Link
          to="/route-mode/canvas-hw/3/post-board"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: '#1976d2',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#1565c0')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#1976d2')}
        >
          Go to Post Board
        </Link>
      </div>
    </div>
  );
};

export default Homework3;
