import React, { createContext, useState } from 'react';
import Toolbar from './UseContextExampleChild';

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const UseContextExample: React.FC = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <h3>useContext 範例</h3>
      <h4>1. 建立 Context</h4>
      <pre>
        <code>
          {`import React, { createContext, useState } from "react";

const ThemeContext = createContext();`}
        </code>
      </pre>
      <h4>2. 提供 Context（Provider）</h4>
      <pre>
        <code>
          {`const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
};`}
        </code>
      </pre>
      <h4>3. 在子元件使用 Context</h4>
      <pre>
        <code>
          {`const ThemedButton = () => {
  const themeContext = useContext(ThemeContext);

  const { theme, setTheme } = themeContext;
  
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        backgroundColor: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      切換主題1 (目前 {theme})
    </button>
  );
};

const AnotherThemedButton = () => {
  const themeContext = useContext(ThemeContext);

  const { theme, setTheme } = themeContext;
  
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        backgroundColor: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      切換主題2 (目前 {theme})
    </button>
  );
};`}
        </code>
      </pre>
      <p>
        👉 useContext 可以讓我們在子元件中讀取 Provider 提供的值，避免 props
        一層層傳。
      </p>
      <p>
        👉 當 Provider 的值改變時，所有使用該 Context 的子元件都會重新 render。
      </p>
      <p>
        👉 Context
        適合用來儲存全域或跨層級共享的資料，如主題、語言、使用者資訊等。
      </p>
      <h4>4. 範例</h4>
      <p>點擊按鈕切換主題（淺色/深色）。</p>
      <Toolbar />
    </ThemeContext.Provider>
  );
};

export { ThemeContext, UseContextExample };
