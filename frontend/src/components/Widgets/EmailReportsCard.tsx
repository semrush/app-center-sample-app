import React, { type FC, useMemo } from "react";
import Card from "intergalactic/card";
import Link from "intergalactic/link";
import { decodeJwt } from "jose";
import { CodeSnippet } from "../CodeSnippet";
import { Paragraph } from "../Paragraph";
import { WidgetButton } from "../WidgetButton";
import { JwtInfo } from "../../common";

interface Props {
  jwt: string;
}

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
