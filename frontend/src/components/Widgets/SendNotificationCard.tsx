import React, { type FC, useMemo, useState } from "react";
import Card from "@semcore/ui/card";
import Input from "@semcore/ui/input";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

interface Props {
  disabled: boolean;
  setDisabled: (state: boolean) => void;
}

export const SendNotificationCard: FC<Props> = ({ disabled, setDisabled }) => {
  const [notificationTrigger, setNotificationTrigger] = useState("");
  const [sendNotificationStatus, setSendNotificationStatus] = useState("");

  const code = useMemo(() => {
    return sendNotificationStatus
      ? JSON.stringify(sendNotificationStatus, null, 4)
      : "";
  }, [sendNotificationStatus]);

  const sendNotificationStatusHandler = (): void => {
    setDisabled(true);

    window.SM.client("getAccessToken")
      .then((token: string) => {
        fetch(`/s2s/send-notification?trigger=${notificationTrigger}`, {
          method: "POST",
          headers: { jwt: token },
        })
          .then((response) => response.json())
          .then((json) => {
            setSendNotificationStatus(json);
          })
          .catch((error) => {
            setSendNotificationStatus(error);
            console.error(error);
          });
      })
      .catch((error: Error) => {
        setSendNotificationStatus(error.message);
      })
      .finally(() => {
        setDisabled(false);
      });
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
