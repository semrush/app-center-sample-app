import React, { type FC, useState } from "react";
import Card from "@semcore/ui/card";
import { Flex, Box } from "@semcore/ui/flex-box";
import { WidgetButton } from "../WidgetButton";

export const PermissionPoliciesCard: FC = () => {
  const videoElement = React.createRef<HTMLVideoElement>();
  const [isVideoShown, setVideoShown] = useState(false);

  const handleDisplayCaptureClick = (): void => {
    navigator.mediaDevices
      .getDisplayMedia({})
      .then((mediaStream) => {
        videoElement.current!.srcObject = mediaStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCameraClick = (): void => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        videoElement.current!.srcObject = mediaStream;
        setVideoShown(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>Check permission policies</Card.Title>
        <Card.Description>
          To test this functionality you need camera and display capture
          permissions, granted to your app by Semrush. Ask Semrush to enable
          required permission policies for your app to test this.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Flex direction="column">
          <WidgetButton
            buttonText="Test Display Capture"
            onClick={handleDisplayCaptureClick}
            mt={0}
          />

          <WidgetButton buttonText="Test Camera" onClick={handleCameraClick} />

          <Box mt={isVideoShown ? 2 : 0}>
            <video
              ref={videoElement}
              hidden={!isVideoShown}
              width="320"
              height="240"
              autoPlay
            />
          </Box>
        </Flex>
      </Card.Body>
    </Card>
  );
};
