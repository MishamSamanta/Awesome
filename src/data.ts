import { Project, TimelineItem, SkillCategory } from './types';

export const GRAPHIC_PROJECTS: Project[] = [
  {
    id: 'g1',
    title: 'Nihon Neo Brutalism',
    category: 'graphic',
    description: 'A conceptual exploration of Japanese typography fused with raw Swiss brutalism, utilizing heavy grid alignments and high-contrast composition.',
    imageUrl: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=800&auto=format&fit=crop',
    client: 'Neo-Tokyo Exhibition',
    year: '2025',
    tags: ['Poster Design', 'Typography', 'Print']
  },
  {
    id: 'g2',
    title: 'Aetheria Sound System',
    category: 'graphic',
    description: 'Visual identity system, custom logomark, and vinyl packaging design for a London-based experimental electronic music label.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    client: 'Aetheria Records',
    year: '2026',
    tags: ['Branding', 'Vinyl Design', 'Packaging']
  },
  {
    id: 'g3',
    title: 'Metropolis Film Festival',
    category: 'graphic',
    description: 'Comprehensive design system including promotional screenprint posters, badges, schedule brochures, and responsive digital screens.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=800&auto=format&fit=crop',
    client: 'Metropolis Cineplex',
    year: '2025',
    tags: ['Visual Identity', 'Event Campaign', 'Layout']
  },
  {
    id: 'g4',
    title: 'Architecure of Silence',
    category: 'graphic',
    description: 'Minimalist editorial design and editorial layout for a premium hardcover architectural monograph, prioritizing negative space and geometric consistency.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    client: 'Verlag Publications',
    year: '2026',
    tags: ['Book Design', 'Editorial', 'Art Direction']
  },
  {
    id: 'g5',
    title: 'Sōl-Energy Elixir',
    category: 'graphic',
    description: 'Clean glass bottle packaging design and tactile label exploration for an organic adaptogenic drink line, utilizing neon gradients and clean layouts.',
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop',
    client: 'Sōl-Energy Co.',
    year: '2025',
    tags: ['Packaging', '3D Render', 'Label Design']
  },
  {
    id: 'g6',
    title: 'Echoes of Darkness',
    category: 'graphic',
    description: 'Expressive abstract screenprint series utilizing distressed scanning textures and dynamic vector compositions.',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    client: 'Personal Archive',
    year: '2024',
    tags: ['Printmaking', 'Fine Art', 'Distressed']
  }
];

export const SHORT_VIDEO_PROJECTS: Project[] = [
  {
    id: 's1',
    title: 'Phantom Speed — Hyper-Cut Reel',
    category: 'short-form',
    description: 'A relentless, high-intensity sound-designed editorial cut showcasing dynamic speed-ramps and multi-layered glow transitions for an automotive client.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    duration: '0:15',
    views: '2.4M',
    aspectRatio: '9:16',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-underpass-at-night-42171-large.mp4', // Safe, high-quality stock video loop
    tags: ['Premiere Pro', 'Sound Design', 'Speed Ramping']
  },
  {
    id: 's2',
    title: 'Neon Tokyo — Cyberpunk Street Fashion',
    category: 'short-form',
    description: 'Atmospheric vertical fashion portrait utilizing glitch aesthetic overlays, neon grading, and custom analog VHS scanlines.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
    duration: '0:22',
    views: '840K',
    aspectRatio: '9:16',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-reflection-of-neon-lights-on-a-wet-street-40294-large.mp4',
    tags: ['Color Grading', 'VHS Glitch', 'After Effects']
  },
  {
    id: 's3',
    title: 'Vektor — Kinetic Typography Loop',
    category: 'short-form',
    description: 'A hypnotic type animation perfectly synchronized to a heavy industrial beat, designed strictly using mathematical coordinate systems and clean bezier paths.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    duration: '0:10',
    views: '1.1M',
    aspectRatio: '9:16',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-retro-futuristic-grid-with-laser-lines-39908-large.mp4',
    tags: ['Kinetic Type', 'After Effects', 'Sound Sync']
  },
  {
    id: 's4',
    title: 'Wanderlust — Iceland Cinematic Travel',
    category: 'short-form',
    description: 'Slow-burn, majestic vertical video tracking rugged basalt cliffs and misty waterfalls, graded in a deep cinematic teal and gold.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    duration: '0:30',
    views: '1.7M',
    aspectRatio: '9:16',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    tags: ['Cinematic', 'DaVinci Resolve', 'Travel']
  }
];

export const LONG_VIDEO_PROJECTS: Project[] = [
  {
    id: 'l1',
    title: 'Voices of Dust — Mojave Documentary',
    category: 'long-form',
    description: 'An immersive 12-minute atmospheric documentary examining the life and solitude of artists living off-grid in the Mojave Desert. Features ambient long takes and pristine voice-over isolation.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
    duration: '11:45',
    year: '2025',
    views: '120K',
    aspectRatio: '16:9',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-highway-in-a-sunny-desert-34444-large.mp4',
    role: 'Lead Editor & Sound Designer',
    tags: ['Documentary', 'Soundscapes', 'DaVinci Resolve']
  },
  {
    id: 'l2',
    title: 'Nebula — Electronic Music Video',
    category: 'long-form',
    description: 'Official music video for electronic producer Kaelen. Inspired by 70s sci-fi cinema, combining analog synthesizer footage with custom visual feedback loops and laser reflections.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    duration: '4:20',
    year: '2026',
    views: '340K',
    aspectRatio: '16:9',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-background-loop-42866-large.mp4',
    role: 'Editor & VFX Artist',
    tags: ['Music Video', 'VFX', 'Analog Glitch']
  },
  {
    id: 'l3',
    title: 'The Synthesis of Form — Tech Launch Film',
    category: 'long-form',
    description: 'A highly polished corporate brand manifesto film for minimalist workstation hardware. Designed to celebrate raw craftsmanship, anodized aluminum textures, and tactile feedback.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    duration: '2:15',
    year: '2025',
    views: '450K',
    aspectRatio: '16:9',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-keyboard-of-a-laptop-glowing-in-the-dark-43301-large.mp4',
    role: 'VFX / Graphic Compositor',
    tags: ['Commercial', 'After Effects', 'Product']
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 't1',
    role: 'Senior Media Director & Brand Designer',
    company: 'Apex Media Labs, New York',
    period: '2024 - Present',
    description: 'Directing the creative narrative, editorial guidelines, and motion design assets for luxury lifestyle brands. Managing a team of 4 video editors and junior designers to produce high-impact vertical and horizontal media.',
    achievements: [
      'Grew active audience across vertical channels by 340% within 12 months.',
      'Designed and executed complete rebrand for 3 global tech startups, defining typography rules and motion behaviors.'
    ]
  },
  {
    id: 't2',
    role: 'Senior Motion & Video Editor',
    company: 'Vapor Studio Co.',
    period: '2022 - 2024',
    description: 'Crafted dynamic commercial ads, social video assets, and long-form YouTube documentary edits. Specialized in highly intricate keyframe animations, audio mixing, sound-design, and advanced DaVinci Resolve color pipelines.',
    achievements: [
      'Successfully edited over 40 corporate manifestos and long-form YouTube series, amassing over 25M organic views.',
      'Established a custom streamlined motion preset library that cut asset production time by 40%.'
    ]
  },
  {
    id: 't3',
    role: 'Freelance Graphic Designer & Video Editor',
    company: 'Independent Practice',
    period: '2019 - 2022',
    description: 'Collaborated with recording labels, indie directors, fashion labels, and architectural publishers. Specialized in bold editorial poster design, typographic book covers, video editing, and color grading.',
    achievements: [
      'Designed 30+ vinyl sleeves and record packaging for experimental musicians.',
      'Won the Annual Brutalist Design Award for the "Architecture of Silence" print layout.'
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: 'Video Editorial',
    skills: ['Premiere Pro', 'DaVinci Resolve', 'Avid Media Composer', 'Offline Editorial', 'Sound Design & Foley']
  },
  {
    name: 'Visual FX & Motion',
    skills: ['After Effects', 'Cinema 4D (Octane)', 'Keyframe Animation', 'Compositing', 'Rotoscoping', 'Glitch Synthesis']
  },
  {
    name: 'Graphic Design',
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Typography & Layout', 'Vector Lettering', 'Branding Systems']
  },
  {
    name: 'Digital UI & Craft',
    skills: ['Figma', 'Prototyping', 'Interactive Motion', 'Tailwind CSS', 'Print Production', 'Silk-Screening']
  }
];
