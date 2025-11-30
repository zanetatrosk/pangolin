import { Music } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-4 py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex size-8 items-center justify-center rounded-md bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-sm">
                <Music className="size-4" />
              </span>
              <span className="font-semibold text-xl">Connect2Dance</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
