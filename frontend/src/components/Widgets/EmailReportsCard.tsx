import Card from "@semcore/ui/card";
import React, { type FC, useMemo } from "react";
import Link from "@semcore/ui/link";
import { decodeJwt, JWTPayload } from "jose";
import { CodeSnippet } from "../CodeSnippet";
import { Paragraph } from "../Paragraph";
import { WidgetButton } from "../WidgetButton";

interface Props {
  jwt: string;
}

type JwtInfo = JWTPayload & {
  active_products: string[];
  email_subscription?: {
    enabled: boolean;
  };
  is_app_installed: boolean;
  is_app_taken_for_free: boolean;
  is_main_product_active: boolean;
  is_main_product_trial_available: boolean;
  lang: string;
  product_trials_available: string[];
  url: string;
  viewer_id: string;
};

export const EmailReportsCard: FC<Props> = ({ jwt }) => {
  const jwtInfo = decodeJwt(jwt) as JwtInfo;

  const code = useMemo(() => {
    const isSubscriptionEnabled =
      jwtInfo.email_subscription != null &&
      "enabled" in jwtInfo.email_subscription;

    return isSubscriptionEnabled
      ? JSON.stringify(jwtInfo.email_subscription, null, 4)
      : "Reports are not active for this application\n" +
          "To be able to send reports, request Semrush to enable them for your application";
  }, [jwtInfo]);

  const handleClick = (): void => {
    window.SM.client("requestEmailSubscriptionChange");
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Reports activation request</Card.Title>
          <Card.Description tag="div">
            <Paragraph>
              <Link
                href="https://www.semrush.com/apps/docs/email-reports#set-up-email-reports"
                target="_blank"
                rel="noreferrer"
              >
                This method
              </Link>{" "}
              offers the user to connect periodic reports and configure the
              frequency of their delivery. When this method is called, a window
              will open with settings for the frequency of report delivery.
            </Paragraph>
            <Paragraph>
              Information about the current user&apos;s subscription to&nbsp;
              <Link
                href="https://www.semrush.com/apps/docs/integration/jwt-reference#email_subscription"
                target="_blank"
                rel="noreferrer"
              >
                periodic reports
              </Link>
              .
            </Paragraph>
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <WidgetButton
            buttonText="Request subscriptions list"
            codeText='SM.client("requestEmailSubscriptionChange")'
            onClick={handleClick}
            mt={0}
          />

          {code && <CodeSnippet code={code} language="json" />}
        </Card.Body>
      </Card>
    </>
  );
};
