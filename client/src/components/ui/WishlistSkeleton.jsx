export default function WishlistSkeleton() {
  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-5 mb-5 bg-white border border-gray-100 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Moving Light Gradient Shimmer */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent z-10 shimmer-anim"></div>

      {/* Image Skeleton */}
      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-lg bg-gray-200 shrink-0 relative overflow-hidden animate-pulse"></div>
      
      {/* Details Skeleton */}
      <div className="flex-1 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-6 animate-pulse">
        {/* Title */}
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 sm:w-2/3 mb-3"></div>
        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded w-16 mb-3"></div>
        {/* Price */}
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 sm:w-24 mb-3"></div>
        {/* Stock Badge */}
        <div className="h-5 bg-gray-200 rounded-full w-20"></div>
      </div>
      
      {/* Actions Skeleton */}
      <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-6 flex flex-row sm:flex-col gap-3 min-w-[140px] animate-pulse">
        {/* Move to Cart Button */}
        <div className="h-10 bg-gray-200 rounded-md flex-1 sm:w-full"></div>
        {/* Remove Button */}
        <div className="h-10 bg-gray-200 rounded-md flex-1 sm:w-full"></div>
      </div>

      <style jsx>{`
        .shimmer-anim {
          animation: shimmer 1.5s infinite ease-in-out;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
