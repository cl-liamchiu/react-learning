import type { ReactNode } from 'react';

export interface CardItem {
  title: string;
  contentBasic: ReactNode;
  contentAdvanced: ReactNode;
}

export const HWData: CardItem = {
  title: 'Create Post',
  contentBasic: (
    <>
      <ul>
        <li>add a post which consists of title / content / image</li>
        <li>remove last post.</li>
      </ul>
    </>
  ),
  contentAdvanced: (
    <>
      <ul>
        <li>modify the published posts</li>
        <li>remove any post</li>
      </ul>
    </>
  ),
};
