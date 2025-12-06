import { useEffect, useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageLightbox({ images, initialIndex, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    const handlePrev = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 cursor-pointer"
            >
                <FaTimes size={24} />
            </button>

            {/* Main Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
                <img
                    src={images[currentIndex].path || images[currentIndex].url}
                    alt={`Ảnh ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scaleIn"
                    onClick={(e) => e.stopPropagation()}
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                        >
                            <FaChevronLeft size={32} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                        >
                            <FaChevronRight size={32} />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white/90 text-sm font-medium backdrop-blur-md">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
}
