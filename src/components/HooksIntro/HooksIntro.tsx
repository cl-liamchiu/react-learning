import React, { useState } from 'react';
import './HooksIntro.css';
import Modal from './Modal';

const HooksIntro: React.FC = () => {
  const data = [
    { title: 'useState', description: '管理元件內部狀態。' },
    {
      title: 'useEffect',
      description:
        '執行副作用（抓資料、訂閱、計時器），可處理 Mount / Update / Unmount。',
    },
    {
      title: 'useRef',
      description: '儲存不會觸發 re-render 的值，或存取 DOM 節點。',
    },
    {
      title: 'useMemo',
      description: '記住計算結果，避免重複計算（效能優化）。',
    },
    {
      title: 'useCallback',
      description: '記住函式，避免因 re-render 產生新函式（搭配子元件）。',
    },
    {
      title: 'useContext',
      description: '讀取全域或跨層級共享的資料（避免 props 一層層傳）。',
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const openModal = (item: { title: string; description: string }) => {
    setModalContent(item);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div>
        <h2>Hooks</h2>
        <p>
          Hook 是 React 提供的一組特殊函式，讓 function component
          也能管理狀態與副作用。
        </p>
        <p>這樣就不需要 class，也能寫出強大又簡潔的元件。</p>
      </div>
      <div className="hooks-grid">
        {data.slice(0, 3).map((item, idx) => (
          <div
            className="hook-block"
            key={idx}
            style={{ cursor: 'pointer' }}
            onClick={() => openModal(item)}
          >
            {item.title}
            <p style={{ fontSize: '12px' }}>{item.description}</p>
          </div>
        ))}
        {data.slice(3, 6).map((item, idx) => (
          <div
            className="hook-block"
            key={idx + 3}
            style={{ cursor: 'pointer' }}
            onClick={() => openModal(item)}
          >
            {item.title}
            <p style={{ fontSize: '12px' }}>{item.description}</p>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen && !!modalContent}
        title={modalContent?.title || ''}
        description={modalContent?.description || ''}
        onClose={closeModal}
      />
    </>
  );
};

export default HooksIntro;
