export const CoverImage: React.FC<{ coverImage?: File; eventName: string }> = ({ coverImage, eventName }) => {
    return (
        <div className="relative h-64 md:h-full w-full overflow-hidden">
          {coverImage ? (
            <img
              src={"https://www.shbarcelona.com/blog/en/wp-content/uploads/2016/04/Bachata-dance.jpg" /*URL.createObjectURL(coverImage)*/}
              alt={eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-rose-200 dark:bg-neutral-800" />
          )}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      );
};