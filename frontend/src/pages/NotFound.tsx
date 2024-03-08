import React, { type FC } from "react";

import { Layout } from "../components/Layout";
import { decodeJwt } from "jose";
import { JwtInfo } from "../common";
import { CodeSnippet } from "../components/CodeSnippet";

interface Props {
  jwt: string;
}

export const NotFound: FC<Props> = ({ jwt }) => {
  const jwtInfo = decodeJwt(jwt) as JwtInfo;

  return (
    <Layout>
      <h3>This is a blank page. Press &quot;backwards&quot; in browser</h3>
      <p>
        Below is your decoded JWT. Please verify that the URL you&apos;ve set is
        correct.
      </p>
      <CodeSnippet code={JSON.stringify(jwtInfo, null, 4)} mt={0} />
    </Layout>
  );
};
