"use client";

import React, { useMemo, useState } from "react";
import { Maximize2, X, ZoomIn } from "lucide-react";

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

function ProductGallery({ images = [], selectedImage, onSelectImage }) {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState({});

  const displayImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images.map((img) => img || DEFAULT_FALLBACK_IMAGE);
    }
    return [DEFAULT_FALLBACK_IMAGE];
  }, [images]);

  const activeImage = selectedImage || displayImages[0] || DEFAULT_FALLBACK_IMAGE;
  const currentSrc = failedImages[activeImage] ? DEFAULT_FALLBACK_IMAGE : activeImage;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleImageError = (imgUrl) => {
    setFailedImages((prev) => ({ ...prev, [imgUrl]: true }));
  };

  return (
    <section className="product-gallery">
      {/* Main Gallery Hero Container with Hover Zoom */}
      <div
        className="gallery-hero group"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={currentSrc}
          alt="Product details preview"
          onError={() => handleImageError(activeImage)}
          className={`gallery-main-image ${isZooming ? "zoomed" : ""}`}
          style={
            isZooming
              ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: "scale(1.8)",
                }
              : undefined
          }
        />

        {/* Hover Hint Overlay */}
        <div className="zoom-hint-badge">
          <ZoomIn size={14} /> Hover to zoom • Click to expand
        </div>

        {/* Fullscreen Trigger */}
        <button
          type="button"
          className="fullscreen-btn"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          aria-label="Expand image fullscreen"
          title="Fullscreen preview"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Thumbnails Navigator */}
      {displayImages.length > 1 && (
        <div className="gallery-thumbnails" aria-label="Product image gallery thumbnails">
          {displayImages.map((image, index) => {
            const thumbSrc = failedImages[image] ? DEFAULT_FALLBACK_IMAGE : image;
            const isActive = image === activeImage;
            return (
              <button
                key={index}
                type="button"
                className={`thumbnail-button ${isActive ? "active" : ""}`}
                onClick={() => onSelectImage?.(image)}
                aria-label={`View image thumbnail ${index + 1}`}
              >
                <img
                  src={thumbSrc}
                  alt={`Thumbnail preview ${index + 1}`}
                  onError={() => handleImageError(image)}
                  className="thumbnail-image"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
            <img src={currentSrc} alt="Full screen preview" className="lightbox-image" />
          </div>
        </div>
      )}

      <style jsx>{`
        .product-gallery {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .gallery-hero {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          aspect-ratio: 4/3;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-in;
          box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.06);
        }

        .gallery-main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 0.25s ease-out;
        }

        .zoom-hint-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          opacity: 0.85;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .gallery-hero:hover .zoom-hint-badge {
          opacity: 0;
        }

        .fullscreen-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .fullscreen-btn:hover {
          background: #ffffff;
          transform: scale(1.08);
          color: #2563eb;
        }

        .gallery-thumbnails {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .thumbnail-button {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 3px;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          width: 72px;
          height: 72px;
          overflow: hidden;
        }

        .thumbnail-button:hover,
        .thumbnail-button.active {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          transform: translateY(-2px);
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          display: block;
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease-out;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          background: #ffffff;
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
        }

        .lightbox-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          border: none;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .lightbox-close:hover {
          background: #ef4444;
          color: #ffffff;
        }

        .lightbox-image {
          max-width: 80vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 16px;
          display: block;
        }
      `}</style>
    </section>
  );
}

export default ProductGallery;

