import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDancerRoles } from "@/services/role-api";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

interface RoleSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const RoleSelect: FC<RoleSelectProps> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState<string>("follower");
  const selectedRole = value ?? internalValue;
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const options = useQuery({
    queryKey: ["registrationRoles"],
    queryFn: getDancerRoles,
  }).data || [];

  return (
    <div className="flex items-center gap-4">
      <h4 className="font-medium whitespace-nowrap">Select Your Role</h4>
        <Select value={selectedRole} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => {
              const value = option.id;
              const label = option.name;
              return (
                <SelectItem key={value || index} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
  );
};
