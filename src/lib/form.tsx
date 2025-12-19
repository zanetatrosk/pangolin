import { createFormHook } from "@tanstack/react-form";
import {
  FormTextField,
  FormCheckboxField,
  FormSelectField,
  FormNumberField,
  FormMultiSelectField,
} from "@/components/form";
import { fieldContext, formContext } from "./form-context";


  
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
    CheckboxField: FormCheckboxField,
    SelectField: FormSelectField,
    NumberField: FormNumberField,
    MultiSelectField: FormMultiSelectField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
