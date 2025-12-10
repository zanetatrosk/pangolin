import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface RegisterButtonsProps {
  beforeLogInCallback?: () => void;
}

export const RegisterButtons: FC<RegisterButtonsProps> = ({
  beforeLogInCallback,
}) => {
  const { t } = useTranslation();

  const signUpOnClick = () => {
      beforeLogInCallback?.();
  };

  const loginOnClick = () => {
    beforeLogInCallback?.();
  };

  return (
    <>
      <Button variant="outline" onClick={loginOnClick}>
        {t("nav.login")}
      </Button>
      <Button onClick={signUpOnClick}>{t("nav.signup")}</Button>
    </>
  );
};
