import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";

interface RegisterButtonsProps {
  beforeLogInCallback?: () => void;
}

export const RegisterButtons: FC<RegisterButtonsProps> = ({
  beforeLogInCallback,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signUpOnClick = () => {
    beforeLogInCallback?.();
    navigate({ to: PATHS.LOGIN, search: { redirect: PATHS.EVENTS.LIST } });
  };

  return (
      <Button onClick={signUpOnClick}>{t("nav.signup")}</Button>
  );
};
