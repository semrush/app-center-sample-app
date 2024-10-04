import React, { type FC, type PropsWithChildren } from "react";
import { Text, type ITextProps } from "intergalactic/typography";

export const Paragraph: FC<PropsWithChildren & ITextProps> = ({
  children,
  ...props
}) => {
  return (
    <Text tag="p" mb={3} {...props}>
      {children}
    </Text>
  );
};
