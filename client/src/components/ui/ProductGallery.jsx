import { useMemo } from "react";

const fallbackImage = "https://via.placeholder.com/800x600?text=Flipkart+Product";

function ProductGallery({ images = [], selectedImage, onSelectImage }) {
  const displayImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images;
    }

    return [fallbackImage];
  }, [images]);

  const mainImage = selectedImage || displayImages[0];

  return (
    <section className="product-gallery">
      <div className="gallery-hero">
        <img src={mainImage} alt="Product preview" className="gallery-main-image" />
      </div>
      {displayImages.length > 1 && (
        <div className="gallery-thumbnails" aria-label="Product image gallery">
          {displayImages.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`thumbnail-button ${image === mainImage ? "active" : ""}`}
              onClick={() => onSelectImage(image)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="thumbnail-image" />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .product-gallery {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .gallery-hero {
          border-radius: 18px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid var(--border);
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .gallery-thumbnails {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
          gap: 12px;
        }

        .thumbnail-button {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 4px;
          background: white;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .thumbnail-button:hover,
        .thumbnail-button.active {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
        }

        .thumbnail-image {
          width: 100%;
          height: 72px;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }

        @media (max-width: 768px) {
          .gallery-hero {
            min-height: 260px;
          }

          .thumbnail-image {
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
}

export default ProductGallery;
