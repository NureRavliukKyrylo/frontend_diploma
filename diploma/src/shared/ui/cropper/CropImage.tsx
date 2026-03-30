import type { ComponentProps } from "react";
import Cropper from "react-easy-crop";

type CropImageProps = {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect?: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete?: ComponentProps<typeof Cropper>["onCropComplete"];
  minZoom?: number;
  maxZoom?: number;
  rotation?: number;
  objectFit?: ComponentProps<typeof Cropper>["objectFit"];
  showGrid?: boolean;
};

export const CropImage = (props: CropImageProps) => {
  return (
    <>
      <Cropper
        image={props.image}
        crop={props.crop}
        zoom={props.zoom}
        aspect={props.aspect}
        onCropChange={props.onCropChange}
        onZoomChange={props.onZoomChange}
        onCropComplete={props.onCropComplete}
        minZoom={props.minZoom}
        maxZoom={props.maxZoom}
        rotation={props.rotation}
        objectFit={props.objectFit}
        showGrid={props.showGrid}
      />
    </>
  );
};
