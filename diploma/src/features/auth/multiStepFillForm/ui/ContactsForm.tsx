import { SocialNetworksInput } from "../../../../shared/inputs";
import { InstagramIcon } from "../../../../shared/assets/common";

export const ContactsForm = () => {
  return (
    <>
      <SocialNetworksInput
        label="Enter your instagram link"
        activeLabel="Instagram link"
        icon={InstagramIcon}
      />
    </>
  );
};
