export interface MediaItem {
  id: number;
  type: "video" | "audio" | "image";
  title: string;
  description: string;
  thumbnail: string;
  youtubeId?: string;
  duration?: string;
  views: string;
  likes: number;
  category: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  fileSize?: string;
  resolution?: string;
  format?: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "video",
    title: "Cinematic Production Showreel 2024",
    description: "A stunning showcase of our latest cinematic productions featuring breathtaking visuals, compelling storytelling, and cutting-edge cinematography techniques.",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "3:45",
    views: "12.5K",
    likes: 892,
    category: "Cinematic",
    tags: ["cinematic", "showreel", "production", "4k", "cinematography"],
    featured: true,
    createdAt: "2024-12-15",
    resolution: "4K",
    format: "MP4"
  },
  {
    id: 2,
    type: "video",
    title: "Corporate Brand Video - Tech Solutions",
    description: "Professional corporate branding video that captures the essence of modern business communication and technological innovation.",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    youtubeId: "jNQXAC9IVRw",
    duration: "2:30",
    views: "8.2K",
    likes: 456,
    category: "Corporate",
    tags: ["corporate", "branding", "business", "technology", "professional"],
    featured: false,
    createdAt: "2024-12-10",
    resolution: "1080p",
    format: "MP4"
  },
  {
    id: 3,
    type: "audio",
    title: "Ambient Soundtrack Collection Vol. 1",
    description: "A collection of ambient soundtracks perfect for background music in various media projects, featuring atmospheric compositions and soothing melodies.",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
    duration: "45:20",
    views: "5.1K",
    likes: 234,
    category: "Audio",
    tags: ["ambient", "soundtrack", "background", "atmospheric", "relaxing"],
    featured: true,
    createdAt: "2024-12-08",
    fileSize: "85MB",
    format: "WAV"
  },
  {
    id: 4,
    type: "image",
    title: "Product Photography Series - Modern Design",
    description: "High-quality product photography showcasing modern design and attention to detail, perfect for e-commerce and marketing materials.",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop",
    views: "15.3K",
    likes: 1203,
    category: "Photography",
    tags: ["product", "photography", "design", "e-commerce", "marketing"],
    featured: false,
    createdAt: "2024-12-05",
    resolution: "6K",
    format: "RAW"
  },
  {
    id: 5,
    type: "video",
    title: "Event Coverage Highlights - Music Festival",
    description: "Dynamic event coverage capturing the energy and excitement of live performances and gatherings, featuring multiple camera angles and professional editing.",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=450&fit=crop",
    youtubeId: "9bZkp7q19f0",
    duration: "4:15",
    views: "6.8K",
    likes: 567,
    category: "Events",
    tags: ["events", "live", "coverage", "music", "festival"],
    featured: false,
    createdAt: "2024-12-03",
    resolution: "4K",
    format: "MP4"
  },
  {
    id: 6,
    type: "audio",
    title: "Podcast Episode: Creative Process in Media",
    description: "An insightful discussion about the creative process in media production and storytelling, featuring industry experts and behind-the-scenes insights.",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop",
    duration: "32:15",
    views: "3.2K",
    likes: 189,
    category: "Podcast",
    tags: ["podcast", "creative", "process", "storytelling", "industry"],
    featured: false,
    createdAt: "2024-12-01",
    fileSize: "45MB",
    format: "MP3"
  },
  {
    id: 7,
    type: "video",
    title: "Documentary: Urban Architecture",
    description: "A compelling documentary exploring modern urban architecture and its impact on city life, featuring interviews with leading architects.",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop",
    youtubeId: "hFZFjoX2cGg",
    duration: "15:30",
    views: "9.7K",
    likes: 678,
    category: "Documentary",
    tags: ["documentary", "architecture", "urban", "design", "city"],
    featured: false,
    createdAt: "2024-11-28",
    resolution: "4K",
    format: "MP4"
  },
  {
    id: 8,
    type: "image",
    title: "Portrait Photography - Professional Series",
    description: "Professional portrait photography series featuring diverse subjects in natural lighting, perfect for corporate and personal branding.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    views: "11.2K",
    likes: 445,
    category: "Photography",
    tags: ["portrait", "photography", "professional", "lighting", "branding"],
    featured: false,
    createdAt: "2024-11-25",
    resolution: "5K",
    format: "RAW"
  },
  {
    id: 9,
    type: "audio",
    title: "Electronic Music Production - Synthwave",
    description: "Original electronic music production featuring retro synthwave aesthetics and modern production techniques.",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
    duration: "28:45",
    views: "4.3K",
    likes: 312,
    category: "Music",
    tags: ["electronic", "synthwave", "retro", "production", "original"],
    featured: false,
    createdAt: "2024-11-22",
    fileSize: "52MB",
    format: "WAV"
  },
  {
    id: 10,
    type: "video",
    title: "Commercial Advertisement - Automotive",
    description: "High-end commercial advertisement for luxury automotive brand, featuring stunning visuals and compelling narrative.",
    thumbnail: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "1:45",
    views: "18.9K",
    likes: 1234,
    category: "Commercial",
    tags: ["commercial", "automotive", "luxury", "advertisement", "high-end"],
    featured: true,
    createdAt: "2024-11-20",
    resolution: "4K",
    format: "MP4"
  },
  {
    id: 11,
    type: "image",
    title: "Landscape Photography - Mountain Series",
    description: "Breathtaking landscape photography capturing the majesty of mountain ranges during golden hour lighting conditions.",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    views: "22.1K",
    likes: 1890,
    category: "Photography",
    tags: ["landscape", "mountains", "nature", "golden hour", "scenic"],
    featured: false,
    createdAt: "2024-11-18",
    resolution: "8K",
    format: "RAW"
  },
  {
    id: 12,
    type: "video",
    title: "Tutorial: Advanced Video Editing Techniques",
    description: "Comprehensive tutorial covering advanced video editing techniques using professional software and industry-standard workflows.",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop",
    youtubeId: "jNQXAC9IVRw",
    duration: "12:30",
    views: "7.4K",
    likes: 523,
    category: "Tutorial",
    tags: ["tutorial", "editing", "video", "professional", "workflow"],
    featured: false,
    createdAt: "2024-11-15",
    resolution: "1080p",
    format: "MP4"
  }
];

export const categories = [
  "All",
  "Cinematic",
  "Corporate",
  "Events",
  "Photography",
  "Audio",
  "Podcast",
  "Documentary",
  "Commercial",
  "Music",
  "Tutorial"
];

export const stats = {
  totalVideos: mediaItems.filter(item => item.type === "video").length,
  totalAudio: mediaItems.filter(item => item.type === "audio").length,
  totalImages: mediaItems.filter(item => item.type === "image").length,
  totalViews: mediaItems.reduce((sum, item) => {
    const views = parseInt(item.views.replace('K', '000').replace('.', ''));
    return sum + views;
  }, 0),
  totalLikes: mediaItems.reduce((sum, item) => sum + item.likes, 0),
  featuredCount: mediaItems.filter(item => item.featured).length
};