import React, { type FC } from "react";

import { Layout } from "../components/Layout";
import { JWTCard } from "../components/Widgets/JWTCard";
import { S2SCard } from "../components/Widgets/S2SCard";
import Link from "@semcore/ui/link";
import { PageHeader } from "../components/PageHeader";
import { Paragraph } from "../components/Paragraph";
import LinkIcon from "@semcore/ui/icon/LinkExternal/l";

interface Props {
  jwt: string;
}

export const JWT: FC<Props> = (props) => {
  return (
    <Layout>
      <PageHeader>
        <Link
          href="https://www.semrush.com/apps/docs/integration/jwt-reference"
          target="_blank"
          rel="noreferrer"
        >
          <Link.Text>How this app knows which user opened it?</Link.Text>
          <Link.Addon>
            <LinkIcon />
          </Link.Addon>
        </Link>
      </PageHeader>
      <Paragraph>
        On first opening, app can use jwt token provided in <code>jwt</code> url
        parameter, it will be valid for 5 minutes.
      </Paragraph>
      <Paragraph mb={6}>
        You can get new 5-minute token at any time using{" "}
        <Link
          href="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#getaccesstoken"
          target="_blank"
          rel="noreferrer"
        >
          <code>SM.client(&quot;getAccessToken&quot;)</code>
        </Link>
        .
      </Paragraph>

      <JWTCard jwtFromUrl={props.jwt} />

      <S2SCard />
    </Layout>
  );
};
