import { useEffect, useState } from "react";

export default function AnimatedModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);

      // 等下一帧再触发动画
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);

      // 动画结束后再卸载
      const timeout = setTimeout(() => setIsMounted(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* modal content */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 transition-all duration-200 transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
