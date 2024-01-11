import React, { type FC } from "react";
import { Layout } from "../components/Layout";
import { EmailReportsCard } from "../components/Widgets/EmailReportsCard";
import { ReportsPreviewCard } from "../components/Widgets/ReportsPreviewCard";
import { useNavigate } from "react-router-dom";
import Link from "@semcore/ui/link";
import LinkIcon from "@semcore/ui/icon/LinkExternal/l";
import { PageHeader } from "../components/PageHeader";
import { Paragraph } from "../components/Paragraph";

interface Props {
  jwt: string;
}

export const Reports: FC<Props> = ({ jwt }) => {
  const navigate = useNavigate();
  const handleClick = (path: string): void => {
    navigate(path);
  };

  return (
    <Layout>
      <PageHeader>
        <Link
          href="https://www.semrush.com/apps/docs/email-reports"
          target="_blank"
          rel="noreferrer"
        >
          <Link.Text>Periodic email reports</Link.Text>
          <Link.Addon>
            <LinkIcon />
          </Link.Addon>
        </Link>
      </PageHeader>
      <Paragraph>
        Periodic reports are a good option for sending reports on a schedule
        that the user chooses. They do not require integration with the Semrush
        server API, and all emails have a single, table-oriented template.
      </Paragraph>
      <Paragraph>
        To use reports, make sure they are enabled in your application
        configuration in the App Center. If you use these reports, you will not
        be able to receive&nbsp;
        <Link
          onClick={() => {
            handleClick("/notifications");
          }}
        >
          email notifications
        </Link>
        .
      </Paragraph>
      <Paragraph mb={6}>
        These emails are sent automatically on a schedule chosen by the user.
        However, you can send a test email to your user if they have the app
        actively running and the subscription is enabled. To do this, go to the
        partner dashboard, open the respective app, and click the &quot;Send
        Test Email&quot; button.
      </Paragraph>

      <EmailReportsCard jwt={jwt} />

      <ReportsPreviewCard />
    </Layout>
  );
};
