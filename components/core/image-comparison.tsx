'use client';
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type ImageComparisonContextType = {
    sliderPosition: number;
    setSliderPosition: (position: number) => void;
    animateToPosition: (position: number) => void;
};

const ImageComparisonContext = createContext<
    ImageComparisonContextType | undefined
>(undefined);

function useImageComparison() {
    const context = useContext(ImageComparisonContext);
    if (!context) {
        throw new Error(
            'useImageComparison must be used within an ImageComparison'
        );
    }
    return context;
}

type ImageComparisonProps = {
    children: React.ReactNode;
    className?: string;
    initialPosition?: number;
};

export function ImageComparison({
    children,
    className,
    initialPosition = 50,
}: ImageComparisonProps) {
    const [sliderPosition, setSliderPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const animateToPosition = useCallback((position: number) => {
        setSliderPosition(Math.max(0, Math.min(100, position)));
    }, []);

    const handleMove = useCallback(
        (clientX: number) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            setSliderPosition(Math.max(0, Math.min(100, percentage)));
        },
        []
    );

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        },
        [isDragging, handleMove]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (isDragging && e.touches[0]) {
                handleMove(e.touches[0].clientX);
            }
        },
        [isDragging, handleMove]
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleMouseMove, handleTouchMove]);

    return (
        <ImageComparisonContext.Provider
            value={{ sliderPosition, setSliderPosition, animateToPosition }}
        >
            <div
                ref={containerRef}
                className={cn('relative overflow-hidden select-none', className)}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {children}
            </div>
        </ImageComparisonContext.Provider>
    );
}

type ImageComparisonImageProps = {
    src: string;
    alt: string;
    position: 'left' | 'right';
    className?: string;
};

export function ImageComparisonImage({
    src,
    alt,
    position,
    className,
}: ImageComparisonImageProps) {
    const { sliderPosition } = useImageComparison();

    if (position === 'left') {
        return (
            <div
                className='absolute inset-0 overflow-hidden'
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={src}
                    alt={alt}
                    className={cn('h-full w-full object-cover', className)}
                    draggable={false}
                />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={cn('h-full w-full object-cover', className)}
            draggable={false}
        />
    );
}

type ImageComparisonSliderProps = {
    className?: string;
};

export function ImageComparisonSlider({ className }: ImageComparisonSliderProps) {
    const { sliderPosition } = useImageComparison();

    return (
        <motion.div
            className='absolute top-0 bottom-0 w-1 cursor-ew-resize'
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            animate={{ left: `${sliderPosition}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className={cn('h-full w-1', className)} />
            <div
                className={cn(
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg',
                    className
                )}
            >
                <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M4 8L1 5M4 8L1 11M4 8H12M12 8L15 5M12 8L15 11'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </div>
        </motion.div>
    );
}

// Hook to control the slider from outside (for theme animation)
export function useImageComparisonControl() {
    const context = useContext(ImageComparisonContext);
    return context;
}
