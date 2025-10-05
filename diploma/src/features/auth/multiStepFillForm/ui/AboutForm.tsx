import { DatePicker } from "@heroui/react";
import { TextArea } from "../../../../shared/inputs";
import { DateTimePicker } from "../../../../shared/inputs";

export const AboutForm = () => {
  return (
    <>
      <TextArea />
      <DateTimePicker />
      <DatePicker className="max-w-[400px]" label="Birth date" />;
    </>
  );
};
