import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { login } from "@/stores/authStore";
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
    navigate({ to: "/login", search: { redirect: PATHS.EVENTS.LIST } });
  };

  const loginOnClick = () => {
    beforeLogInCallback?.();
    navigate({ to: "/login", search: { redirect: PATHS.EVENTS.LIST } });
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
