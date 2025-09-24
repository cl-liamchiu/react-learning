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
import ImageManipulation from '../components/Canvas/ImageManipulation';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/route-mode" element={<Layout />}>
        <Route path="react-info" element={<ReactInfo />} />
        <Route path="react-component" element={<ComponentInfo />} />
        <Route path="react-hooks" element={<HooksIntro />} />
        <Route path="react-hw/:id" element={<HomeworkPage />} />
        <Route path="react-route-info" element={<RouteInfo />} />
        <Route path="canvas" element={<CanvasIntro />} />
        <Route path="canvas-api" element={<CanvasAPI />} />
        <Route path="canvas-image-manipulation" element={<ImageManipulation />} />
        <Route path="canvas-hw/:id" element={<HomeworkPage />} />
      </Route>
    </Routes>
  );
}
