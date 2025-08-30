import { useState } from 'react';

const ImageWithFallback = ({ src, alt, fallbackSrc = '/images/products/placeholder.jpg', className, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            {...props}
        />
    );
};

export default ImageWithFallback;