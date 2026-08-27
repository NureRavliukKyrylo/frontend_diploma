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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("profile");
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
      animation="right"
    >
      <div className={styles.wrapperModalCropper}>
        <h1>{t("cropper.title")}</h1>
        <h2>{t("cropper.description")}</h2>
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
            {t("cropper.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            className={styles.saveButtonCropper}
            onClick={handleSave}
            type="button"
          >
            {t("cropper.save")}
          </BaseButtonWrapper>
        </div>
      </div>
    </BaseModal>
  );
};
