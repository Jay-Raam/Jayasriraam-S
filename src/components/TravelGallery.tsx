import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { galleryImages, galleryVideos, type GalleryItem, type GalleryVideoItem } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });

    const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            ref={cardRef}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
            className="group relative border-2 border-[var(--black)] overflow-hidden bg-[var(--black)] w-full h-full"
        >
            {/* Image with parallax */}
            <div className="relative overflow-hidden w-full h-full">
                <motion.img
                    style={{ y: imgY, height: '120%', top: '-10%', position: 'absolute' }}
                    src={item.image}
                    alt={item.location}
                    loading="lazy"
                    className="w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90 z-10" />

                {/* Location badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm z-10">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-[var(--accent2)]" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white/90">
                        {item.location}
                    </span>
                </div>

                {/* Caption (revealed on hover) */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 z-10 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
                    >
                        <p className="font-serif text-[0.85rem] italic leading-[1.7] text-white/90">
                            {item.caption}
                        </p>
                        <div className="mt-2 text-[0.52rem] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">
                            {item.date}
                        </div>
                    </motion.div>
                </div>

                {/* Corner accent on hover */}
                <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-[var(--accent2)] z-10" />
            </div>
        </motion.div>
    );
}

function GalleryVideoCard({ item, index }: { item: GalleryVideoItem; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isLoaded && videoRef.current) {
            const playVideo = () => {
                videoRef.current?.play().catch(err => {
                    console.log('Video autoplay interrupted or blocked:', err);
                });
            };
            playVideo();
        }
    }, [isLoaded]);

    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            ref={cardRef}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
            className="group relative border-2 border-[var(--black)] overflow-hidden bg-[var(--black)] w-full h-full"
        >
            <div className="relative overflow-hidden w-full h-full">
                {isLoaded ? (
                    <video
                        ref={videoRef}
                        src={item.video}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-all duration-300 filter grayscale blur-[4px] group-hover:filter-none scale-102 group-hover:scale-100"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-900 animate-pulse flex items-center justify-center">
                        <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white/40">Loading Video...</span>
                    </div>
                )}

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90 z-10" />

                {/* Location badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm z-10">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-[var(--accent2)]" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white/90">
                        {item.location}
                    </span>
                </div>

                {/* Caption (revealed on hover) */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10 z-10 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
                    >
                        <p className="font-serif text-[0.8rem] italic leading-[1.5] text-white/90 line-clamp-2">
                            {item.caption}
                        </p>
                        <div className="mt-1 text-[0.5rem] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">
                            {item.date}
                        </div>
                    </motion.div>
                </div>

                {/* Corner accent on hover */}
                <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-[var(--accent2)] z-10" />
            </div>
        </motion.div>
    );
}

export function TravelGallery() {
    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="gallery" className="border-b-2 border-[var(--black)] bg-[var(--white)] px-6 py-16 md:px-12 md:py-20 md:min-h-screen md:flex md:flex-col md:justify-center">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col h-full justify-between">
                <div>
                    <SectionHeader number="10" title="TRAVEL MEMORIES" />

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                        className="mb-8 max-w-[520px]"
                    >
                        <p className="font-serif text-[0.85rem] italic leading-[1.9] text-[var(--gray)]">
                            Places that inspire me — from the hills of Dindigul to the streets of Chennai.
                            Every trip becomes a story, every story becomes a blog post.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:h-[calc(100vh-280px)] min-h-[500px]">
                    {/* Left Column - Images */}
                    <div className="flex flex-col gap-6 md:col-span-3 min-h-0 h-full">
                        {galleryImages.map((item, index) => (
                            <div key={`img-${index}`} className="flex-1 min-h-[250px] md:min-h-0 relative h-full">
                                <GalleryCard item={item} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Videos */}
                    <div className="flex flex-col gap-6 md:col-span-2 min-h-0 h-full">
                        {galleryVideos.map((item, index) => (
                            <div key={`vid-${index}`} className="flex-1 min-h-[150px] md:min-h-0 relative h-full">
                                <GalleryVideoCard item={item} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
