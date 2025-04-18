import { useMemo } from 'react';
import './SkeletonLoader.css'

interface SkeletonLoaderProps {
  type?: 'grid' | 'single' | 'dashboard';
  items?: number;
}

function SkeletonLoader({ type = 'grid', items = 12 }: SkeletonLoaderProps) {
  const skeletonItems = useMemo(() => {
    return Array.from({ length: items }, () => ({
      height: Math.floor(Math.random() * (300 - 150) + 150),
    }));
  }, [items]);

  if (type === 'dashboard') {
    return (
      <div className="space-y-8 w-screen">
        {/* Welcome Section Skeleton */}
        <div className="skeleton h-[150px] w-[full] rounded-2xl">
          <div className="skeleton__block h-full"></div>
        </div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="skeleton h-[100px] rounded-2xl">
            <div className="skeleton__block h-full"></div>
          </div>
          <div className="skeleton h-[100px] rounded-2xl">
            <div className="skeleton__block h-full"></div>
          </div>
        </div>

        {/* Albums Section Skeleton */}
        <div className="skeleton-grid w-screen">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`album-${index}`} className="skeleton rounded-2xl w-full">
              <div className="skeleton__block h-[200px]"></div>
            </div>
          ))}
        </div>

        {/* Images Section Skeleton */}
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={`image-${index}`} className="skeleton rounded-2xl">
              <div className="skeleton__block h-[250px]"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'single') {
    return (
      <div className="skeleton">
        <div className="skeleton__block"></div>
      </div>
    );
  }

  return (
    <div className="skeleton-grid">
      {skeletonItems.map((item, index) => (
        <div
          key={index}
          className="skeleton rounded-2xl overflow-hidden"
          style={{ height: `${item.height}px` }}
        >
          <div className="skeleton__block h-full"></div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader