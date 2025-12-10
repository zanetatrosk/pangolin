import { useNavigate } from "@tanstack/react-router";
import { ProfileMenuItem } from "../types";

export const useProfileMenu = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (item: ProfileMenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      navigate({ to: item.href });
    }
  };

  return { handleMenuItemClick };
};
