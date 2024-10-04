import React, { type FC, useMemo, useState } from "react";
import Card from "intergalactic/card";
import Input from "intergalactic/input";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

export const SendNotificationCard: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState("");
  const [sendNotificationStatus, setSendNotificationStatus] = useState("");

  const code = useMemo(() => {
    return sendNotificationStatus
      ? JSON.stringify(sendNotificationStatus, null, 4)
      : "";
  }, [sendNotificationStatus]);

  const sendNotificationStatusHandler = async (): Promise<void> => {
    try {
      setDisabled(true);

      const token = await window.SM.client("getAccessToken");
      const response = await fetch(
        `/s2s/send-notification?trigger=${notificationTrigger}`,
        {
          method: "POST",
          headers: { jwt: token },
        },
      );
      const json = await response.json();

      setSendNotificationStatus(json);
    } catch (error) {
      setSendNotificationStatus(error as string);
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>Sending notification</Card.Title>
        <Card.Description>
          All mailing lists in the application are associated with a specific
          event trigger. The list of these triggers for each mailing list can be
          viewed in the Available subscriptions method above and used in the
          input field below to send a mailing list to the current user.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Input size="l" w={300}>
          <Input.Value
            placeholder="Notification trigger"
            value={notificationTrigger}
            onChange={setNotificationTrigger}
          />
        </Input>

        <WidgetButton
          buttonText="Send notification"
          onClick={sendNotificationStatusHandler}
          loading={disabled}
          disabled={disabled}
        />

        {code && <CodeSnippet code={code} />}
      </Card.Body>
    </Card>
  );
};
