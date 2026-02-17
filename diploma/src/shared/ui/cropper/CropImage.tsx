import Cropper, { type Area } from "react-easy-crop";

export interface CropImageProps {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  onCropChange: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  onZoomChange: React.Dispatch<React.SetStateAction<number>>;
  onCropComplete: (_: Area, croppedPixels: Area) => void;
  minZoom: number;
  maxZoom: number;
  rotation: number;
  objectFit:
    | "contain"
    | "cover"
    | "horizontal-cover"
    | "vertical-cover"
    | undefined;
  showGrid: boolean;
}
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
