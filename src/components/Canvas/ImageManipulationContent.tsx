import type { ReactNode } from 'react';
import * as ImageManipulationExamples from './ImageManipulationExamples';

export interface CardItem {
  title: string;
  content: ReactNode;
}

export const cardData: CardItem[] = [
  {
    title: '像素操作',
    content: (
      <>
        <h3>灰階 (Grayscale) → 把彩色轉成黑白</h3>
        <ImageManipulationExamples.GrayScaleExample />
        <h3>反相 (Invert) → 負片效果</h3>
        <ImageManipulationExamples.InvertExample />
        <h3>調整亮度 (Brightness) → 調亮或調暗</h3>
        <ImageManipulationExamples.BrightnessExample />
        <ImageManipulationExamples.BrightnessExample2 />
        <h3>調整透明度 (Alpha) → 調整透明度</h3>
        <ImageManipulationExamples.AlphaExample />
      </>
    ),
  },
  {
    title: '變形',
    content: (
      <>
        <h3>遮罩</h3>
        <ImageManipulationExamples.MaskingExample />
        {/* <h3>平移 (Translate)</h3>
        <ImageManipulationExamples.TranslateExample />
        <h3>旋轉 (Rotate)</h3>
        <ImageManipulationExamples.RotateExample />
        <h3>縮放 (Scale)</h3>
        <ImageManipulationExamples.ScaleExample /> */}
      </>
    ),
  },
];
