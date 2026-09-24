import { DATA } from "@/data/resume";
import Image from "next/image";
import { useState } from "react";
import AILightbox from "./AILightbox";

export default function AIGallery() {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Extract unique categories (if any) or default to reference ones if missing
  const dataCategories = Array.from(new Set(DATA.gallery?.map(g => g.category) || ["All"]));
  const categories = dataCategories.length > 1 ? dataCategories : ["All", "Hackathons", "College", "Work Setup", "Travel"];
  
  const allImages = DATA.gallery || [];
  // For the sake of the demo, if category is not "All" but the data doesn't have it, we just show a subset
  const filteredImages = filter === "All" 
    ? allImages 
    : allImages.filter(img => img.category === filter || img.title?.toLowerCase().includes(filter.toLowerCase()));

  // If no images match filter, just fallback to first 4
  const displayImages = filteredImages.length > 0 ? filteredImages : allImages.slice(0, 4);
  const featuredImage = displayImages[0];
  const sideImages = displayImages.slice(1, 3);
  const bottomImages = displayImages.slice(3, 5);

  return (
    <div className="w-full mt-4 flex flex-col gap-6 max-w-4xl">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
        
        {/* Featured Left */}
        {featuredImage && (
          <div 
            className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group border border-neutral-800 hover:border-lime-500/50 transition-colors"
            onClick={() => setLightboxIndex(0)}
          >
            <Image 
              src={featuredImage.src}
              alt={featuredImage.title || "Gallery image"}
              fill sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        
        {/* Right Side Stack */}
        <div className="flex flex-col gap-4 h-full">
          {/* Top Right Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 h-1/2">
            {sideImages.map((img, idx) => (
              <div 
                key={idx}
                className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group border border-neutral-800 hover:border-lime-500/50 transition-colors"
                onClick={() => setLightboxIndex(idx + 1)}
              >
                <Image 
                  src={img.src}
                  alt={img.title || "Gallery image"}
                  fill sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
          
          {/* Bottom Right Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 h-1/2">
            {bottomImages.map((img, idx) => (
              <div 
                key={idx}
                className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group border border-neutral-800 hover:border-lime-500/50 transition-colors"
                onClick={() => setLightboxIndex(idx + sideImages.length + 1)}
              >
                <Image 
                  src={img.src}
                  alt={img.title || "Gallery image"}
                  fill sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-colors ${
              filter === cat 
                ? 'bg-[#D4F870] text-black font-bold'
                : 'border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <AILightbox 
          images={displayImages} 
          initialIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
        />
      )}
    </div>
  );
}
