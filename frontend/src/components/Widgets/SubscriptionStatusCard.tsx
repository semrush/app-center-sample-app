import React, { type FC, useMemo, useState } from "react";
import Card from "@semcore/ui/card";
import Input from "@semcore/ui/input";
import { ApiMetadata } from "../../common";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

interface SubscriptionStatusResponse {
  meta: ApiMetadata;
  data: {
    active: boolean;
  };
}

export const SubscriptionStatusCard: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    SubscriptionStatusResponse | string
  >();

  const code = useMemo(() => {
    return JSON.stringify(subscriptionStatus, null, 4);
  }, [subscriptionStatus]);

  const subscriptionStatusHandler = async (): Promise<void> => {
    try {
      setDisabled(true);

      const token = await window.SM.client("getAccessToken");
      const response = await fetch(
        `/s2s/subscriptions-status?subscription_id=${subscriptionId}`,
        {
          method: "GET",
          headers: { jwt: token },
        },
      );
      const json = await response.json();

      setSubscriptionStatus(json);
    } catch (error) {
      setSubscriptionStatus(error as string);
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>Subscription status</Card.Title>
        <Card.Description>
          You can check the subscription status of a user to mailing lists in
          your application through server API methods. The subscription ID can
          be viewed in the Available subscriptions method above and used in the
          input field below.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Input size="l" w={300}>
          <Input.Value
            placeholder="Subscription ID"
            value={subscriptionId}
            onChange={setSubscriptionId}
          />
        </Input>

        <WidgetButton
          buttonText="Request subscription status"
          onClick={subscriptionStatusHandler}
          loading={disabled}
          disabled={disabled}
        />

        {code && <CodeSnippet code={code} />}
      </Card.Body>
    </Card>
  );
};
