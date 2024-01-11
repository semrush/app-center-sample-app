import React, { type FC, useMemo, useState } from "react";
import Card from "@semcore/ui/card";
import { ApiMetadata } from "../../common";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

interface Props {
  jwt: string;
  disabled: boolean;
  setDisabled: (state: boolean) => void;
}

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

export const SubscriptionListCard: FC<Props> = ({ disabled, setDisabled }) => {
  const [subscriptionList, setSubscriptionList] = useState<
    SubscriptionListResponse | string
  >();

  const code = useMemo(() => {
    return JSON.stringify(subscriptionList, null, 4);
  }, [subscriptionList]);

  const subscriptionListHandler = (): void => {
    setDisabled(true);

    window.SM.client("getAccessToken")
      .then((token: string) => {
        fetch("/s2s/subscriptions-list", {
          method: "GET",
          headers: { jwt: token },
        })
          .then((response) => response.json())
          .then((json) => {
            setSubscriptionList(json);
          })
          .catch((error) => {
            setSubscriptionList(error);
            console.error(error);
          });
      })
      .catch((error: Error) => {
        setSubscriptionList(error.message);
      })
      .finally(() => {
        setDisabled(false);
      });
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
