import React, { type FC } from "react";
import Button, { IButtonProps } from "@semcore/ui/button";
import Tag from "@semcore/ui/tag";
import { Box } from "@semcore/ui/flex-box";

type Props = IButtonProps & {
  buttonText: string;
  onClick: () => void;
  codeText?: string;
};

export const WidgetButton: FC<Props> = ({
  buttonText,
  codeText,
  onClick,
  ...props
}) => {
  return (
    <Box>
      <Button
        size="l"
        theme="info"
        use="secondary"
        mt={2}
        onClick={onClick}
        {...props}
      >
        <Button.Text>{buttonText}</Button.Text>
        {codeText && (
          <Button.Addon>
            <Tag tag="span" theme="primary">
              <code>{codeText}</code>
            </Tag>
          </Button.Addon>
        )}
      </Button>
    </Box>
  );
};
