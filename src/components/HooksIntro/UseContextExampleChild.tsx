import { useContext } from 'react';
import { ThemeContext } from './UseContextExample';

const ThemedButton: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  const { theme, setTheme } = themeContext;
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      切換主題1 (目前 {theme})
    </button>
  );
};

const AnotherThemedButton: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  const { theme, setTheme } = themeContext;
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '1rem',
      }}
    >
      切換主題2 (目前 {theme})
    </button>
  );
};

const Toolbar: React.FC = () => {
  return (
    <div>
      <ThemedButton />
      <AnotherThemedButton />
    </div>
  );
};

export default Toolbar;
