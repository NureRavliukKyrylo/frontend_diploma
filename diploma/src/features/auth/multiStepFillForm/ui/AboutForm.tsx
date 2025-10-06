import { DatePicker } from "@heroui/react";
import { TextArea } from "../../../../shared/inputs";
import { I18nProvider } from "@react-aria/i18n";

export const AboutForm = () => {
  return (
    <>
      <TextArea />
      <I18nProvider>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <DatePicker
            className="max-w-[284px]"
            label="Дата народження"
            classNames={{
              inputWrapper: "bg-[rgba(217,217,217,0.5)] rounded-[10px]",
            }}
          />
        </div>
      </I18nProvider>
    </>
  );
};
