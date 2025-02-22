import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";

import CardTitle from "@saleor/components/CardTitle";
import { FormSpacer } from "@saleor/components/FormSpacer";
import RadioGroupField from "@saleor/components/RadioGroupField";
import { RequirementsPicker } from "@saleor/discounts/types";
import i18n from "@saleor/i18n";
import { FormErrors } from "@saleor/types";
import { FormData } from "../VoucherDetailsPage";

interface VoucherRequirementsProps {
  data: FormData;
  defaultCurrency: string;
  disabled: boolean;
  errors: FormErrors<"minAmountSpent" | "minCheckoutItemsQuantity">;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const VoucherRequirements = ({
  data,
  disabled,
  errors,
  onChange
}: VoucherRequirementsProps) => {
  const requirementsPickerChoices = [
    {
      label: i18n.t("None"),
      value: RequirementsPicker.NONE
    },
    {
      label: i18n.t("Minimal order value"),
      value: RequirementsPicker.ORDER
    },
    {
      label: i18n.t("Minimum quantity of items"),
      value: RequirementsPicker.ITEM
    }
  ];

  return (
    <Card>
      <CardTitle title={i18n.t("Minimum Requirements")} />
      <CardContent>
        <RadioGroupField
          choices={requirementsPickerChoices}
          disabled={disabled}
          name={"requirementsPicker" as keyof FormData}
          value={data.requirementsPicker}
          onChange={onChange}
        />
        <FormSpacer />
        {data.requirementsPicker === RequirementsPicker.ORDER ? (
          <TextField
            disabled={disabled}
            error={!!errors.minAmountSpent}
            helperText={errors.minAmountSpent}
            label={i18n.t("Minimal order value")}
            name={"minAmountSpent" as keyof FormData}
            value={data.minAmountSpent}
            onChange={onChange}
            fullWidth
          />
        ) : data.requirementsPicker === RequirementsPicker.ITEM ? (
          <TextField
            disabled={disabled}
            error={!!errors.minCheckoutItemsQuantity}
            helperText={errors.minCheckoutItemsQuantity}
            label={i18n.t("Minimum quantity of items")}
            name={"minCheckoutItemsQuantity" as keyof FormData}
            value={data.minCheckoutItemsQuantity}
            onChange={onChange}
            fullWidth
          />
        ) : null}
      </CardContent>
    </Card>
  );
};
export default VoucherRequirements;
