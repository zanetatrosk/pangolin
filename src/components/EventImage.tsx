import { Calendar } from "lucide-react";

interface EventImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export const EventImage: React.FC<EventImageProps> = ({ 
  src, 
  alt, 
  className = "w-full h-full object-cover" 
}) => {

  if (!src) {
    return (
      <div className={`bg-linear-to-br from-violet-100 to-violet-200 dark:from-violet-900 dark:to-violet-800 flex items-center justify-center ${className}`}>
        <Calendar className="w-16 h-16 text-violet-400 dark:text-violet-600" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};
