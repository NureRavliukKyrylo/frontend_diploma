import { BaseModal } from "@shared/ui/modals";
import { ActionCropButtons } from "../action-buttons/ActionCropButtons";
import { CropImage } from "@shared/ui";
import styles from "./ModalCropper.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import {
  Flip,
  ZoomIn,
  ZoomOut,
  Reset,
  Grid,
} from "@shared/assets/icons/actions";
import { MAX_ZOOM, MIN_ZOOM } from "@shared/config/constants";
import { useModalCropper } from "../../model/useModalCropper";

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
  const {
    crop,
    zoom,
    grid,
    rotation,
    setCrop,
    setZoom,
    onCropComplete,
    gridActive,
    zoomIn,
    zoomOut,
    rotate,
    reset,
    handleSave,
    handleClose,
  } = useModalCropper({ src, onClose, onSave });

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
            <CropImage
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
