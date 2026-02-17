import { BaseButtonWrapper } from "@shared/ui/buttons";

export interface ActionCropButtonsProps {
  className?: string;
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: () => void;
  reset: () => void;
  grid: () => void;
  zoomInImage: string;
  zoomOutImage: string;
  flipImage: string;
  resetImage: string;
  gridImage: string;
}
export const ActionCropButtons = ({
  className,
  zoomIn,
  zoomOut,
  rotate,
  reset,
  grid,
  zoomInImage,
  zoomOutImage,
  flipImage,
  resetImage,
  gridImage,
}: ActionCropButtonsProps) => {
  return (
    <>
      <BaseButtonWrapper className={className} type="button" onClick={grid}>
        <img src={gridImage} alt="grid" />
      </BaseButtonWrapper>
      <BaseButtonWrapper className={className} type="button" onClick={zoomIn}>
        <img src={zoomInImage} alt="zoom-in" />
      </BaseButtonWrapper>

      <BaseButtonWrapper className={className} type="button" onClick={zoomOut}>
        <img src={zoomOutImage} alt="zoom-out" />
      </BaseButtonWrapper>

      <BaseButtonWrapper className={className} type="button" onClick={rotate}>
        <img src={flipImage} alt="flip" />
      </BaseButtonWrapper>

      <BaseButtonWrapper className={className} type="button" onClick={reset}>
        <img src={resetImage} alt="reset" />
      </BaseButtonWrapper>
    </>
  );
};
