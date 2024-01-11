import React, { type FC, type PropsWithChildren } from "react";
import { PageHeader } from "./PageHeader";
import { Box } from "@semcore/ui/flex-box";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box px={2} pt={2} pb={6} mx="auto" w={850}>
      <PageHeader />
      {children}
    </Box>
  );
};
