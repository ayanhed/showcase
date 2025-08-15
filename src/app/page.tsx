"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Heart, 
  Share2, 
  Download,
  Filter,
  Search,
  Grid3X3,
  List,
  Calendar,
  Clock,
  User,
  Eye,
  Star
} from "lucide-react";

import { mediaItems, categories, stats, type MediaItem } from "@/lib/mediaData";

export default function MediaProductionPlatform() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const filteredMedia = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredMedia = mediaItems.filter(item => item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="hdf-gradient px-4 py-2 rounded-lg">
                <span className="text-white font-bold text-xl">HDF</span>
              </div>
              <span className="text-white/80 font-medium">Media Production</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-light pl-10 pr-4 py-2 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <button className="glass-light p-2 rounded-lg text-white/80 hover:text-white transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2 glass-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-white/60 hover:text-white"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-purple-600 text-white" : "text-white/60 hover:text-white"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

             {/* Hero Section */}
       <section className="relative py-20 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
         <div className="container mx-auto px-6 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center"
           >
             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
               Creative Media
               <span className="hdf-gradient bg-clip-text text-transparent"> Production</span>
             </h1>
             <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
               Showcasing exceptional video, audio, and visual content with cutting-edge production quality
             </p>
             <div className="flex items-center justify-center space-x-4">
               <button className="btn-primary">
                 Explore Projects
               </button>
               <button className="btn-secondary">
                 Contact Us
               </button>
             </div>
           </motion.div>
         </div>
       </section>

       {/* Statistics Section */}
       <section className="py-16">
         <div className="container mx-auto px-6">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="grid grid-cols-2 md:grid-cols-4 gap-6"
           >
             <div className="glass-card p-6 text-center">
               <div className="hdf-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Eye className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">{stats.totalViews.toLocaleString()}</h3>
               <p className="text-white/60">Total Views</p>
             </div>
             
             <div className="glass-card p-6 text-center">
               <div className="hdf-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Heart className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">{stats.totalLikes.toLocaleString()}</h3>
               <p className="text-white/60">Total Likes</p>
             </div>
             
             <div className="glass-card p-6 text-center">
               <div className="hdf-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Play className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">{stats.totalVideos}</h3>
               <p className="text-white/60">Videos</p>
             </div>
             
             <div className="glass-card p-6 text-center">
               <div className="hdf-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Star className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">{stats.featuredCount}</h3>
               <p className="text-white/60">Featured</p>
             </div>
           </motion.div>
         </div>
       </section>

      {/* Featured Media Section */}
      {featuredMedia.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Featured Content</h2>
              <p className="text-white/60">Our most popular and recent productions</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredMedia.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="media-card group cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="hdf-gradient p-4 rounded-full">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 glass-light px-3 py-1 rounded-full text-sm text-white">
                      {item.type}
                    </div>
                    {item.duration && (
                      <div className="absolute bottom-4 left-4 glass-light px-2 py-1 rounded text-sm text-white">
                        {item.duration}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="glass-light p-2 rounded-lg text-white/60 hover:text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="glass-light p-2 rounded-lg text-white/60 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "hdf-gradient text-white"
                    : "glass-light text-white/60 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">All Media</h2>
              <p className="text-white/60">{filteredMedia.length} items found</p>
            </div>
          </div>
          
          <div className={viewMode === "grid" ? "media-grid" : "space-y-4"}>
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`media-card group cursor-pointer ${
                  viewMode === "list" ? "flex items-center space-x-6" : ""
                }`}
                onClick={() => setSelectedMedia(item)}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-32 rounded-xl" : "rounded-t-2xl"}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="hdf-gradient p-3 rounded-full">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 glass-light px-2 py-1 rounded text-xs text-white">
                    {item.type}
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 left-2 glass-light px-2 py-1 rounded text-xs text-white">
                      {item.duration}
                    </div>
                  )}
                </div>
                
                <div className={`flex-1 ${viewMode === "list" ? "p-4" : "p-6"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    {item.featured && (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <p className="text-white/70 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{item.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="glass-light p-2 rounded-lg text-white/60 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="glass-light p-2 rounded-lg text-white/60 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Player Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedMedia.title}</h2>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="glass-light p-2 rounded-lg text-white/60 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                {selectedMedia.type === "video" && selectedMedia.youtubeId && (
                  <div className="video-player mb-6">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1`}
                      title={selectedMedia.title}
                      className="w-full aspect-video rounded-lg"
                      allowFullScreen
                    />
                  </div>
                )}
                
                {selectedMedia.type === "audio" && (
                  <div className="bg-black/50 rounded-lg p-8 mb-6 text-center">
                    <div className="hdf-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Volume2 className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/80">Audio Player Coming Soon</p>
                  </div>
                )}
                
                {selectedMedia.type === "image" && (
                  <div className="mb-6">
                    <img
                      src={selectedMedia.thumbnail}
                      alt={selectedMedia.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
                
                <div className="space-y-4">
                  <p className="text-white/80">{selectedMedia.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedMedia.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedMedia.likes} likes</span>
                    </div>
                    {selectedMedia.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedMedia.duration}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedMedia.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass-light px-3 py-1 rounded-full text-sm text-white/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4">
                    <button className="btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="btn-secondary">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
                 )}
       </AnimatePresence>

       {/* Footer */}
       <footer className="glass-nav border-t border-white/10 mt-20">
         <div className="container mx-auto px-6 py-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div className="col-span-1 md:col-span-2">
               <div className="flex items-center space-x-4 mb-6">
                 <div className="hdf-gradient px-4 py-2 rounded-lg">
                   <span className="text-white font-bold text-xl">HDF</span>
                 </div>
                 <span className="text-white/80 font-medium">Media Production</span>
               </div>
               <p className="text-white/60 mb-6 max-w-md">
                 Creating exceptional media content with cutting-edge technology and creative vision. 
                 From cinematic productions to corporate branding, we bring your ideas to life.
               </p>
               <div className="flex items-center space-x-4">
                 <button className="glass-light p-3 rounded-lg text-white/60 hover:text-white transition-colors">
                   <Share2 className="w-5 h-5" />
                 </button>
                 <button className="glass-light p-3 rounded-lg text-white/60 hover:text-white transition-colors">
                   <Heart className="w-5 h-5" />
                 </button>
                 <button className="glass-light p-3 rounded-lg text-white/60 hover:text-white transition-colors">
                   <Download className="w-5 h-5" />
                 </button>
               </div>
             </div>
             
             <div>
               <h3 className="text-white font-semibold mb-4">Categories</h3>
               <ul className="space-y-2">
                 {categories.slice(1, 6).map((category) => (
                   <li key={category}>
                     <button className="text-white/60 hover:text-white transition-colors">
                       {category}
                     </button>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div>
               <h3 className="text-white font-semibold mb-4">Contact</h3>
               <ul className="space-y-2 text-white/60">
                 <li>hello@hdfmedia.com</li>
                 <li>+1 (555) 123-4567</li>
                 <li>Studio Address</li>
                 <li>Available 24/7</li>
               </ul>
             </div>
           </div>
           
           <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
             <p className="text-white/60 text-sm">
               © 2024 HDF Media Production. All rights reserved.
             </p>
             <div className="flex items-center space-x-6 mt-4 md:mt-0">
               <button className="text-white/60 hover:text-white transition-colors text-sm">
                 Privacy Policy
               </button>
               <button className="text-white/60 hover:text-white transition-colors text-sm">
                 Terms of Service
               </button>
               <button className="text-white/60 hover:text-white transition-colors text-sm">
                 Cookie Policy
               </button>
             </div>
           </div>
         </div>
       </footer>
     </div>
   );
 }
