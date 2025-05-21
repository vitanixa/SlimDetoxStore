const ProductImage = ({ src, alt, onClick }) => (
  <img
    src={src}
    alt={alt}
    onClick={onClick}
    className="cursor-pointer object-contain h-80 w-full rounded shadow"
  />
);

export default ProductImage;
