import { useMemo } from 'react';

interface Column {
  items: { height: number }[];
}

const MasonrySkeletonLoader = ({ numberOfItems = 20 }) => {
  const columns = useMemo(() => {
    // Determine number of columns based on screen width
    const getColumnCount = () => {
      if (window.innerWidth >= 1536) return 8; // 2xl
      if (window.innerWidth >= 1280) return 6; // xl
      if (window.innerWidth >= 1024) return 5; // lg
      if (window.innerWidth >= 768) return 4;  // md
      if (window.innerWidth >= 640) return 3;  // sm
      return 2; // default
    };

    const columnCount = getColumnCount();
    const columns: Column[] = Array.from({ length: columnCount }, () => ({ items: [] }));
    
    // Distribute items across columns
    Array.from({ length: numberOfItems }).forEach((_, index) => {
      const height = Math.floor(Math.random() * (400 - 200) + 200);
      const columnIndex = index % columnCount;
      columns[columnIndex].items.push({ height });
    });

    return columns;
  }, [numberOfItems]);

  return (
    <div className="w-full animate-pulse">
      <div className="flex gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-4">
            {column.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="w-full rounded-xl overflow-hidden bg-gradient-to-b from-gray-200 to-gray-300"
                style={{ height: `${item.height}px` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonrySkeletonLoader; 