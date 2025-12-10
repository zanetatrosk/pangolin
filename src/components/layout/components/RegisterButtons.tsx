import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores/authStore";

interface RegisterButtonsProps {
  beforeLogInCallback?: () => void;
}

export const RegisterButtons: FC<RegisterButtonsProps> = ({
  beforeLogInCallback,
}) => {
  const { t } = useTranslation();
  const { login } = useAuthStore();

  const signUpOnClick = () => {
    beforeLogInCallback?.();
    // TODO: Implement real signup flow
    // For now, mock login for testing
    login({
      id: "user-123",
      name: "John Dancer",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    });
  };

  const loginOnClick = () => {
    beforeLogInCallback?.();
    // TODO: Implement real login flow
    // For now, mock login for testing
    login({
      id: "user-456",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    });
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
