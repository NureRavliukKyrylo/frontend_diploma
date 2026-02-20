import type { ComponentProps } from "react";
import Cropper from "react-easy-crop";

type CropImageProps = ComponentProps<typeof Cropper>;

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
