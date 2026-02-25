
import React from 'react';
import { ImageFile } from '../types';
import ImageUploader from './ImageUploader';

interface ImageWorkspaceProps {
  productImage: ImageFile | null;
  onProductImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({ 
    productImage, 
    onProductImageUpload, 
 }) => {
  return (
    <div className="w-full">
        <ImageUploader 
            id="product-uploader"
            title="Upload Subject"
            image={productImage}
            onImageUpload={onProductImageUpload}
        />
    </div>
  );
};

export default ImageWorkspace;
