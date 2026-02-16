import { useState, useCallback } from "react";
import { BaseModal } from "@shared/ui/modals";
import { ActionCropButtons } from "../action-buttons/ActionCropButtons";
import { getCroppedImage } from "@shared/libs";
import Cropper, { type Area } from "react-easy-crop";
import styles from "./ModalCropper.module.scss";
import { BaseButtonWrapper } from "../../buttons";
import {
  Flip,
  ZoomIn,
  ZoomOut,
  Reset,
  Grid,
} from "@shared/assets/icons/actions";
import {
  ZOOM_STEP,
  MAX_ZOOM,
  MIN_ZOOM,
  ROTATION_STEP,
} from "@shared/config/constants";

interface ModalCropperProps {
  src: string;
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
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [grid, setGrid] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const gridActive = () => setGrid((prev) => !prev);
  const zoomIn = () => setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  const zoomOut = () => setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  const rotate = () => {
    setRotation((prev) => (prev + ROTATION_STEP) % 360);
    setCrop({ x: 0, y: 0 });
  };
  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setGrid(false);
  };

  const handleSave = async () => {
    if (!src || !croppedAreaPixels) return;

    const blob = await getCroppedImage(src, croppedAreaPixels, rotation);
    if (!blob) return;

    const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
    onSave(file);
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth={maxWidth}
      showClosed={false}
    >
      <div className={styles.wrapperModalCropper}>
        <h1>POSITION AND CROP</h1>
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
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
              rotation={rotation}
              objectFit="contain"
              showGrid={grid}
            />
          </div>
          <div className={styles.actionCropButtons}>
            <ActionCropButtons
              className={styles.actionButton}
              zoomOut={zoomOut}
              zoomIn={zoomIn}
              rotate={rotate}
              reset={reset}
              grid={gridActive}
              zoomInImage={ZoomIn}
              zoomOutImage={ZoomOut}
              flipImage={Flip}
              resetImage={Reset}
              gridImage={Grid}
            />
          </div>
        </div>

        <div className={styles.saveButtons}>
          <BaseButtonWrapper
            onClick={onClose}
            className={styles.cancelButtonCropper}
            type="button"
          >
            Cancel
          </BaseButtonWrapper>
          <BaseButtonWrapper
            className={styles.saveButtonCropper}
            onClick={handleSave}
            type="button"
          >
            Save
          </BaseButtonWrapper>
        </div>
      </div>
    </BaseModal>
  );
};
