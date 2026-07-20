export default function WishlistSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-5 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="w-[120px] h-[120px] rounded-lg bg-gray-200 shrink-0"></div>
      
      {/* Details Skeleton */}
      <div className="flex-1 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-6">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
        {/* Stock Badge */}
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      
      {/* Actions Skeleton */}
      <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-6 flex flex-row sm:flex-col gap-3 min-w-[140px]">
        {/* Move to Cart Button */}
        <div className="h-10 bg-gray-200 rounded-md flex-1 sm:w-full"></div>
        {/* Remove Button */}
        <div className="h-10 bg-gray-200 rounded-md flex-1 sm:w-full"></div>
      </div>
    </div>
  );
}
