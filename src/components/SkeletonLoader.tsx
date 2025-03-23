import { useMemo } from 'react';

interface SkeletonProps {
  numberOfItems?: number;
}

const SkeletonLoader = ({ numberOfItems = 20 }: SkeletonProps) => {
  // Generate random heights for skeleton items
  const skeletonItems = useMemo(() => {
    return Array.from({ length: numberOfItems }, () => ({
      height: Math.floor(Math.random() * (400 - 200) + 200), // Random height between 200-400px
    }));
  }, [numberOfItems]);

  return (
    <div className="w-full animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {skeletonItems.map((item, index) => (
          <div
            key={index}
            className="w-full rounded-xl overflow-hidden bg-gradient-to-b from-gray-200 to-gray-300 transform transition-all duration-300"
            style={{ height: `${item.height}px` }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader; 