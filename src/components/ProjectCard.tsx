import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { Play, Eye, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  id?: string;
  key?: string | number;
}

export default function ProjectCard({ project, onClick, id }: ProjectCardProps) {
  const isShortForm = project.category === 'short-form';
  const isLongForm = project.category === 'long-form';

  // Determine aspect ratio class based on project specification
  let aspectClass = 'aspect-[3/4]'; // Graphic design default
  if (isShortForm) {
    aspectClass = 'aspect-[9/16]';
  } else if (isLongForm) {
    aspectClass = 'aspect-[16/9]';
  }

  return (
    <motion.div
      id={id || `project-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer block"
    >
      <div className="relative overflow-hidden bg-[#121215] rounded-xs border border-[#1d1d22]/40 mb-4">
        {/* Thumbnail Image */}
        <img
          src={project.imageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          style={{ aspectRatio: isShortForm ? '9/16' : isLongForm ? '16/9' : '3/4' }}
        />

        {/* Video Overlay Indicator */}
        {(isShortForm || isLongForm) && (
          <div className="absolute inset-0 bg-[#000]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-accent text-[#0a0a0c] flex items-center justify-center shadow-lg"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </motion.div>
          </div>
        )}

        {/* Badge Metrics on Card */}
        {isShortForm && (
          <div className="absolute top-3 right-3 bg-[#0a0a0c]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest text-[#f4f4f6]/80 flex items-center gap-1 border border-[#ffffff]/10 rounded-xs">
            <Eye className="w-3 h-3 text-accent" />
            <span>{project.views} VIEWS</span>
          </div>
        )}

        {isLongForm && (
          <div className="absolute top-3 right-3 bg-[#0a0a0c]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest text-[#f4f4f6]/80 flex items-center gap-1 border border-[#ffffff]/10 rounded-xs">
            <Clock className="w-3 h-3 text-accent" />
            <span>{project.duration}</span>
          </div>
        )}

        {project.category === 'graphic' && project.year && (
          <div className="absolute bottom-3 right-3 bg-[#0a0a0c]/85 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono tracking-widest text-accent border border-accent/20 rounded-xs">
            {project.year}
          </div>
        )}
      </div>

      {/* Meta Information */}
      <div className="space-y-1.5 px-1">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-medium text-[#f4f4f6] group-hover:text-accent transition-colors duration-300 tracking-tight">
            {project.title}
          </h3>
          {project.client && (
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
              {project.client}
            </span>
          )}
        </div>

        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-mono text-zinc-500 border border-zinc-800/60 rounded-xs px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
