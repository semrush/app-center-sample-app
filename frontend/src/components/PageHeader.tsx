import React, { type FC, type PropsWithChildren } from "react";
import { Text, type ITextProps } from "@semcore/ui/typography";

export const PageHeader: FC<PropsWithChildren & ITextProps> = ({
  children,
  ...props
}) => {
  return (
    <Text tag="h1" size={600} mt={6} mb={3} {...props}>
      {children}
    </Text>
  );
};
