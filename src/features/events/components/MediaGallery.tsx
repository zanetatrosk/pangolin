import { EventMediaItem } from "@/features/newEvent/types"

export const MediaGallery: React.FC<{ mediaFiles?: EventMediaItem[] }> = ({ mediaFiles }) => {
    return (
        <>
        {mediaFiles && mediaFiles.length > 0 && (
              <div className="order-4 lg:order-0">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaFiles.map((item, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden bg-muted"
                    >
                      {item.type === "image" ? (
                        <img
                          src={URL.createObjectURL(item.file)}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/10">
                          <span className="text-xs text-muted-foreground">
                            Video
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </>
    )
}