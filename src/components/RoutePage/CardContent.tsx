import type { ReactNode } from 'react';

export interface CardItem {
  title: string;
  content: ReactNode;
}

export const cardData: CardItem[] = [
  {
    title: '為什麼需要 Router？',
    content: (
      <>
        <p>在 純 React 裡，如果我只用 state 來切換畫面：</p>
        <ul>
          <li>不管切到哪個頁面，網址永遠一樣。</li>
          <li>重新整理會回到預設首頁。</li>
          <li>瀏覽器的上一頁/下一頁失效。</li>
          <li>無法直接分享該頁連結給別人。</li>
        </ul>
        <p>👉 這些都是因為 SPA 的畫面切換與網址沒有綁定。</p>
      </>
    ),
  },
  {
    title: 'React Router 的角色',
    content: (
      <>
        <ul>
          <li>透過 {'<Route>'} 定義「路徑 → 對應的 Component」。</li>
          <pre>
            <code>
              {`<Routes>
    <Route path="/" element={<App />} />
    <Route path="/route-mode" element={<Layout />}>
        <Route path="react-info" element={<ReactInfo />} />
        <Route path="component" element={<ComponentInfo />} />
        <Route path="hooks" element={<HooksIntro />} />
        <Route path="hw/:id" element={<HomeworkPage />} />
        <Route path="route-info" element={<RouteInfo />} />
    </Route>
</Routes>`}
            </code>
          </pre>
          <li>
            用 {'<Link>'} 或 {'<NavLink>'} 來切換頁面，不會整頁刷新。
          </li>
          <pre>
            <code>
              {`<NavLink to="/route-mode/react-info"> React 簡介 </NavLink>
<NavLink to="/route-mode/component"> Component 介紹 </NavLink>
<NavLink to="/route-mode/hooks"> Hooks </NavLink>
<NavLink to="/route-mode/hw1"> Homework 1 </NavLink>
<NavLink to="/route-mode/hw2"> Homework 2 </NavLink>
<NavLink to="/route-mode/route-info"> Router 簡介 </NavLink>
<NavLink to="/"> Switch to Non-Route </NavLink>`}
            </code>
          </pre>
          <li>在同一個 HTML 裡，根據網址渲染對應的 component。</li>
        </ul>
      </>
    ),
  },
  {
    title: 'React Router 常見用法',
    content: (
      <>
        <ol>
          <li>
            Nested Routes（巢狀路由）
            <ul>
              <li>定義父子層結構，子頁面會顯示在父路徑之下。</li>
              <pre>
                <code>
                  {`<Route path="dashboard">
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>`}
                </code>
              </pre>
              <p>
                👉 /dashboard/profile 會導到 {`<Profile />`}{' '}
                頁面，/dashboard/settings 會導到 {`<Settings />`} 頁面。
              </p>
            </ul>
          </li>
          <li>
            Index Routes
            <ul>
              <li>在巢狀路由下，設定「預設子頁面」。</li>
              <pre>
                <code>
                  {`<Route path="dashboard">
  <Route index element={<Home />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>`}
                </code>
              </pre>
              <p>👉 /dashboard 會預設導到 {`<Home />`} 頁面。</p>
            </ul>
          </li>
          <li>
            Layout Routes
            <ul>
              <li>
                提供一個「共同外框」（例如 header、sidebar），子路由渲染在{' '}
                {`<Outlet />`} 位置。
              </li>
              <pre>
                <code>
                  {`<Route path="dashboard" element={<Dashboard />}>
  <Route index element={<Home />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>`}
                </code>
              </pre>
              <pre>
                <code>
                  {`import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
    <h1>Dashboard</h1>
    {/* will either be <Profile/> or <Settings/> */}
      <Outlet />
    </div>
  );
}`}
                </code>
              </pre>
              <p>
                👉 {`<Home />、<Profile/> 和 <Settings/>`} 會顯示在{' '}
                {`<Dashboard /> 中的 <Outlet />`} 位置。
              </p>
            </ul>
          </li>
          <li>
            Dynamic Routes
            <ul>
              <li>用 :param 表示路徑變數。</li>
              <pre>
                <code>
                  {`<Route path="hw/:id" element={<HomeworkPage />} />`}
                </code>
              </pre>
              <pre>
                <code>
                  {`const HomeworkPage = () => {
  const { id } = useParams();

  if (id === '1') return <Homework1 />;
  if (id === '2') return <Homework2 />;

  return null;
};`}
                </code>
              </pre>
              <p></p>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
];
