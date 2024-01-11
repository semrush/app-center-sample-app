import React, { type FC, useEffect } from "react";
import { Box } from "@semcore/ui/flex-box";
import Tag from "@semcore/ui/tag";
import TabLine from "@semcore/ui/tab-line";
import KeyIcon from "@semcore/ui/icon/Key/m";
import WebPagesIcon from "@semcore/ui/icon/WebPages/m";
import Notification from "@semcore/ui/icon/Notification/m";
import Mail from "@semcore/ui/icon/Mail/m";
import { useNavigate, useLocation } from "react-router-dom";

export const PageHeader: FC = () => {
  const location = useLocation();
  const [tabValue, tabValueOnChange] = React.useState(location.pathname);
  const navigate = useNavigate();

  // subscribe to location changing to change parent window url
  useEffect(() => {
    window.SM.client("replaceUrl", location.pathname);
  }, [location.pathname]);

  const handleClick = (path: string): void => {
    // change location in react-router
    navigate(path);
  };

  return (
    <>
      <Box mb={3}>
        <Tag wMax="100%">Iframe Url: {location.pathname}</Tag>
      </Box>
      <TabLine
        mb={3}
        size="l"
        value={tabValue}
        onChange={tabValueOnChange}
        aria-label="Page"
      >
        <TabLine.Item
          value={"/"}
          onClick={() => {
            handleClick("/");
          }}
        >
          <TabLine.Item.Text>JWT</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <KeyIcon />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          value={"/methods"}
          onClick={() => {
            handleClick("/methods");
          }}
        >
          <TabLine.Item.Text>JS SDK Methods</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <WebPagesIcon />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          value={"/notifications"}
          onClick={() => {
            handleClick("/notifications");
          }}
        >
          <TabLine.Item.Text>Email Notifications</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Notification />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          value={"/reports"}
          onClick={() => {
            handleClick("/reports");
          }}
        >
          <TabLine.Item.Text>Email Reports</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Mail />
          </TabLine.Item.Addon>
        </TabLine.Item>
      </TabLine>
    </>
  );
};
