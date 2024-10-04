import React, { type FC, useMemo, useState } from "react";
import Card from "intergalactic/card";
import { ApiMetadata } from "../../common";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

interface Subscription {
  id: number;
  name: string;
  description: string;
  trigger: string;
}

interface SubscriptionListResponse {
  meta: ApiMetadata;
  data: {
    subscriptions: Array<Subscription>;
  };
}

export const SubscriptionListCard: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [subscriptionList, setSubscriptionList] = useState<
    SubscriptionListResponse | string
  >();

  const code = useMemo(() => {
    return JSON.stringify(subscriptionList, null, 4);
  }, [subscriptionList]);

  const subscriptionListHandler = async (): Promise<void> => {
    try {
      setDisabled(true);

      const token = await window.SM.client("getAccessToken");
      const response = await fetch("/s2s/subscriptions-list", {
        method: "GET",
        headers: { jwt: token },
      });
      const json = await response.json();

      setSubscriptionList(json);
    } catch (error) {
      setSubscriptionList(error as string);
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>Available subscriptions</Card.Title>
        <Card.Description>
          You can request a list of all mailing lists available to your
          application through server API methods.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <WidgetButton
          buttonText="Request subscriptions list"
          onClick={subscriptionListHandler}
          loading={disabled}
          disabled={disabled}
          mt={0}
        />

        {code && <CodeSnippet code={code} />}
      </Card.Body>
    </Card>
  );
};
