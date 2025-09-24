import type { ReactNode } from 'react';

export interface CardItem {
  title: string;
  contentBasic: ReactNode;
  contentAdvanced: ReactNode;
}

export const HWData: CardItem = {
  title: 'Canvas Load Image',
  contentBasic: (
    <>
      <ul>
        <li>process uploaded image and draw on canvas</li>
        <li>make sure that uploading same image again can trigger the above processing normally</li>
      </ul>
    </>
  ),
  contentAdvanced: (
    <>
      <ul>
        <li>rotate / blur image via canvas</li>
        <li>download the transformed image</li>
      </ul>
    </>
  ),
};
