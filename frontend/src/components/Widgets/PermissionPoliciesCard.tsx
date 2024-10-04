import React, { type FC, useState } from "react";
import Card from "intergalactic/card";
import { Flex, Box } from "intergalactic/flex-box";
import { WidgetButton } from "../WidgetButton";

export const PermissionPoliciesCard: FC = () => {
  const videoElement = React.createRef<HTMLVideoElement>();
  const [isVideoShown, setVideoShown] = useState(false);

  const handleDisplayCaptureClick = async (): Promise<void> => {
    try {
      videoElement.current!.srcObject =
        await navigator.mediaDevices.getDisplayMedia({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleCameraClick = async (): Promise<void> => {
    try {
      videoElement.current!.srcObject =
        await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoShown(true);
    } catch (error) {
      console.log(error);
    }
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
