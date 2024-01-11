import React from "react";
import type { FC } from "react";
import type { Language } from "prism-react-renderer";
import { Highlight, themes } from "prism-react-renderer";
import { Box, BoxProps } from "@semcore/ui/flex-box";

type Props = {
  code: string;
  language?: Language;
} & BoxProps;

export const CodeSnippet: FC<Props> = ({
  code,
  language = "javascript",
  ...boxProps
}) => (
  <Highlight theme={themes.vsDark} code={code} language={language}>
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <Box
        tag="pre"
        p={2}
        m={0}
        mt={2}
        style={{ borderRadius: "6px", overflow: "auto", ...style }}
        {...boxProps}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </Box>
    )}
  </Highlight>
);
