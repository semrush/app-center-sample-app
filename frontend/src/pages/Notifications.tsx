import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import Link from "intergalactic/link";
import LinkIcon from "intergalactic/icon/LinkExternal/l";
import { Layout } from "../components/Layout";
import { SendNotificationCard } from "../components/Widgets/SendNotificationCard";
import { SubscriptionStatusCard } from "../components/Widgets/SubscriptionStatusCard";
import { SubscriptionListCard } from "../components/Widgets/SubscriptionListCard";
import { PageHeader } from "../components/PageHeader";
import { Paragraph } from "../components/Paragraph";

export const Notifications: FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string): void => {
    navigate(path);
  };

  return (
    <Layout>
      <PageHeader>
        <Link
          href="https://www.semrush.com/apps/docs/server-to-server-api/notifications"
          target="_blank"
          rel="noreferrer"
        >
          <Link.Text>Email notifications</Link.Text>
          <Link.Addon>
            <LinkIcon />
          </Link.Addon>
        </Link>
      </PageHeader>
      <Paragraph>
        App Center has a feature and dedicated API for sending and scheduling
        email notifications and reports.
      </Paragraph>
      <Paragraph>
        An email report consists of a template and changeable parts, which are
        filled in with desirable data. Discuss a convenient email template, its
        design and its variable parts with your account manager.
      </Paragraph>
      <Paragraph>
        Note that the email notifications are turned off by default.
      </Paragraph>
      <Paragraph mb={6}>
        To use email notifications, you need to configure mailing lists and
        message templates with the Semrush team. Please note that these
        notifications cannot be used simultaneously with&nbsp;
        <Link
          onClick={() => {
            handleClick("/reports");
          }}
        >
          email reports
        </Link>
        .
      </Paragraph>

      <SubscriptionListCard />

      <SubscriptionStatusCard />

      <SendNotificationCard />
    </Layout>
  );
};
