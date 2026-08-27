import { MapLocationPicker } from "@features/map";
import { useLocationForm } from "../model/useLocationForm";
import styles from "./LocationStep.module.scss";
import { OfferMarker, type OfferFormData } from "@entities/offer";
import { forwardRef, useImperativeHandle } from "react";
import type { StepRef } from "../../main";
import { useTranslation } from "react-i18next";

interface LocationStepProps {
  data: OfferFormData;
}

export const LocationStep = forwardRef<StepRef, LocationStepProps>(
  ({ data }, ref) => {
    const { t } = useTranslation(["timeBank"]);
    const { formik, coordinates, handleLocationChange } = useLocationForm({
      data,
    });

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
          await formik.submitForm();
          return true;
        }
        formik.setTouched(
          Object.keys(formik.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {},
          ),
        );
        return false;
      },
    }));

    return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <span className={styles.hint}>
          {t("timeBank:forms.labels.mapHint")}
        </span>

        <div className={styles.mapWrapper}>
          <MapLocationPicker
            entityCoordinates={coordinates}
            onLocationChange={handleLocationChange}
            icon={OfferMarker}
            popupClassName={styles.popupOffer}
            popupContent={
              <>
                <h3 className={styles.popupOfferTitle}>{data.title}</h3>
                <p className={styles.popupOfferLocation}>
                  {t("timeBank:forms.labels.offerLocationPopup")}
                </p>
              </>
            }
            zoom={data.location ? 10 : 4}
          />
        </div>

        {formik.touched.location && (
          <div className="errorInput">{formik.errors.location}</div>
        )}
      </form>
    );
  },
);
