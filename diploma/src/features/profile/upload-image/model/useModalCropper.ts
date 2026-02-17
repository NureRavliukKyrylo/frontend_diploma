import { useState, useCallback } from "react";
import type { Area } from "react-easy-crop";
import { getCroppedImage } from "@shared/libs";
import {
  ZOOM_STEP,
  MAX_ZOOM,
  MIN_ZOOM,
  ROTATION_STEP,
} from "@shared/config/constants";

interface UseModalCropperParams {
  src: string;
  onClose: () => void;
  onSave: (file: File) => void;
}

export const useModalCropper = ({
  src,
  onClose,
  onSave,
}: UseModalCropperParams) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [grid, setGrid] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const gridActive = () => {
    setGrid((prev) => !prev);
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const rotate = () => {
    setRotation((prev) => (prev + ROTATION_STEP) % 360);
    setCrop({ x: 0, y: 0 });
  };

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(MIN_ZOOM);
    setRotation(0);
    setGrid(false);
    setCroppedAreaPixels(null);
  };

  const handleSave = async () => {
    if (!src || !croppedAreaPixels) return;

    const blob = await getCroppedImage(src, croppedAreaPixels, rotation);
    if (!blob) return;

    const file = new File([blob], "cropped-image.jpg", {
      type: "image/jpeg",
    });

    onSave(file);
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return {
    crop,
    zoom,
    grid,
    rotation,
    croppedAreaPixels,
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
  };
};
