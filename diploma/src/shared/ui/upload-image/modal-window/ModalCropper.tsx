import { useState, useCallback } from "react";
import { BaseModal } from "@shared/ui/modals";
import { ActionCropButtons } from "../action-buttons/ActionCropButtons";
import { CropImage } from "../crop-image/CropImage";
import { getCroppedImage } from "@shared/libs";
import Cropper, { type Area } from "react-easy-crop";
import styles from "./ModalCropper.module.scss";
import { BaseButtonWrapper } from "../../buttons";
import { Flip, ZoomIn, ZoomOut, Reset } from "@shared/assets/icons/actions";

interface ModalCropperProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
  aspect?: number;
  maxWidth?: string;
}

export const ModalCropper = ({
  src,
  isOpen,
  onClose,
  onSave,
  aspect = 1 / 1,
  maxWidth,
}: ModalCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 1, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 1, 1));
  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    setCrop({ x: 0, y: 0 });
  };
  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleSave = async () => {
    if (!src || !croppedAreaPixels) return;

    const blob = await getCroppedImage(src, croppedAreaPixels, rotation);
    if (!blob) return;

    const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
    onSave(file);
    onClose();
  };

  if (!src) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth={maxWidth}>
      <div className={styles.wrapperModalCropper}>
        <h1>Position and crop</h1>
        <h2>Edit the image's position before submitting it for review.</h2>

        <div className={styles.imageActionsBlock}>
          <div className={styles.cropContainer}>
            <Cropper
              image={src}
              crop={crop}
              onCropChange={setCrop}
              zoom={zoom}
              onZoomChange={setZoom}
              aspect={aspect}
              onCropComplete={onCropComplete}
              minZoom={1}
              maxZoom={3}
              rotation={rotation}
              objectFit="contain"
              showGrid={true}
            />
          </div>
          <div className={styles.actionCropButtons}>
            <ActionCropButtons
              className={styles.actionButton}
              zoomOut={zoomOut}
              zoomIn={zoomIn}
              rotate={rotate}
              reset={reset}
              zoomInImage={ZoomIn}
              zoomOutImage={ZoomOut}
              flipImage={Flip}
              resetImage={Reset}
            />
          </div>
        </div>

        <div className={styles.saveButtons}>
          <BaseButtonWrapper onClick={handleSave} type="button">
            Save
          </BaseButtonWrapper>
          <BaseButtonWrapper onClick={onClose} type="button">
            Cancel
          </BaseButtonWrapper>
        </div>
      </div>
    </BaseModal>
  );
};
