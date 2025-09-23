import { Routes, Route } from 'react-router';
import Layout from '../components/Layout/latout';
import App from '../App';
import ReactInfo from '../components/ReactIntroPage/ReactInfo';
import ComponentInfo from '../components/ComponentPage/ComponentInfo';
import HooksIntro from '../components/HooksIntro/HooksIntro';
import HomeworkPage from '../components/HomeworkPage/HomeworkPage';
import RouteInfo from '../components/RoutePage/RouteInfo';
import CanvasIntro from '../components/Canvas/CanvasIntro';
import CanvasAPI from '../components/Canvas/CanvasAPI';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/route-mode" element={<Layout />}>
        <Route path="react-info" element={<ReactInfo />} />
        <Route path="component" element={<ComponentInfo />} />
        <Route path="hooks" element={<HooksIntro />} />
        <Route path="hw/:id" element={<HomeworkPage />} />
        <Route path="route-info" element={<RouteInfo />} />
        <Route path="canvas" element={<CanvasIntro />} />
        <Route path="canvas-api" element={<CanvasAPI />} />
      </Route>
    </Routes>
  );
}
