import React, { useMemo, useState, useEffect, useRef } from 'react';

interface MediaViewerProps {
  tab: { path: string; name: string };
}

const MediaViewer = ({ tab }: MediaViewerProps) => {
  // In Electron, local files are accessible via file:// protocol.
  const url = useMemo(() => `file://${tab.path}`, [tab.path]);
  const isImage = /\.(jpe?g|png|gif|svg|webp|bmp|ico)$/i.test(tab.name);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(tab.name);
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom(prev => Math.min(400, Math.max(10, prev + (e.deltaY > 0 ? -10 : 10))));
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center overflow-auto bg-bg-surface p-8"
    >
      {isImage && (
        <img
          src={url}
          alt={tab.name}
          className="object-contain rounded shadow-md"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        />
      )}
      {isVideo && (
        <video
          src={url}
          controls
          className="max-w-full max-h-[80vh] rounded shadow-md"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        />
      )}
      {!isImage && !isVideo && (
        <div className="text-text-tertiary text-sm">Unsupported media type: {tab.name}</div>
      )}
    </div>
  );
};

export default MediaViewer;
