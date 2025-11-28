export default function ErrorState({ message = 'Something went wrong', onRetry }: { message?: string, onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
      <div className="text-xl font-semibold text-red-600 mb-2">
        {message}
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}