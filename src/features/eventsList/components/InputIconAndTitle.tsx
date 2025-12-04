export const InputIconAndTitle: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
   <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-pink-500" />
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </label>
      </div>
        {children}
    </div>
);
