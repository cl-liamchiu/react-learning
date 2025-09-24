import { Routes, Route } from 'react-router';
import Layout from '../components/Layout/latout';
import App from '../App';
import ReactInfo from '../components/ReactIntroPage/ReactInfo';
import ComponentInfo from '../components/ComponentPage/ComponentInfo';
import HooksIntro from '../components/HooksIntro/HooksIntro';
import HomeworkLayout from '../components/HomeworkPage/HomeworkLayout';
import HomeworkById from '../components/HomeworkPage/HomeworkById';
import RouteInfo from '../components/RoutePage/RouteInfo';
import CanvasIntro from '../components/Canvas/CanvasIntro';
import CanvasAPI from '../components/Canvas/CanvasAPI';
import ImageManipulation from '../components/Canvas/ImageManipulation';
import PostBoard from '../components/Homework3/PostBoard';
import CreatePostPage from '../components/Homework3/CreatePostPage';
import { PostProvider } from '../components/Homework3/PostContext/PostContext';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/route-mode" element={<Layout />}>
        <Route path="react-info" element={<ReactInfo />} />
        <Route path="react-component" element={<ComponentInfo />} />
        <Route path="react-hooks" element={<HooksIntro />} />
        <Route path="react-hw/:id" element={<HomeworkLayout />}>
          <Route index element={<HomeworkById />} />
        </Route>
        <Route path="react-route-info" element={<RouteInfo />} />
        <Route path="canvas" element={<CanvasIntro />} />
        <Route path="canvas-api" element={<CanvasAPI />} />
        <Route
          path="canvas-image-manipulation"
          element={<ImageManipulation />}
        />
        <Route
          path="canvas-hw/:id"
          element={
            <PostProvider>
              <HomeworkLayout />
            </PostProvider>
          }
        >
          <Route index element={<HomeworkById />} />
          <Route path="post-board" element={<PostBoard />} />
          <Route path="create-post" element={<CreatePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
