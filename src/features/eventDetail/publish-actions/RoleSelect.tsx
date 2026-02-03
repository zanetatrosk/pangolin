import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";

export const RoleSelect: FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("follower");
  const options = [
    { value: "leader", label: "Leader" },
    { value: "follower", label: "Follower" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="flex items-center gap-4">
      <h4 className="font-medium whitespace-nowrap">Select Your Role</h4>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => {
              const value = option.value;
              const label = option.label;
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
