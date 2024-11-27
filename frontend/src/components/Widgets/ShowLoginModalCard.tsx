import React, { type FC } from "react";
import Card from "intergalactic/card";
import LinkIcon from "intergalactic/icon/LinkExternal/m";
import Link from "intergalactic/link";
import { WidgetButton } from "../WidgetButton";

export const ShowLoginModalCard: FC = () => {
  return (
    <Card mt={3}>
      <Card.Header>
        <Card.Title>
          <Link
            href="https://www.semrush.com/apps/docs/api-references/js-sdk#showloginmodal"
            target="_blank"
            rel="noreferrer"
          >
            <Link.Text>showLoginModal</Link.Text>
            <Link.Addon>
              <LinkIcon />
            </Link.Addon>
          </Link>
        </Card.Title>
        <Card.Description>
          Shows a pop-up window that asks the user to login. Can be closed.
          After a successful login, the current page will reload. Call this
          method if <code>SM.client(&quot;getAccessToken&quot;)</code> tells you
          that the user has signed out.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <WidgetButton
          buttonText="Show login modal"
          codeText='SM.client("showLoginModal")'
          onClick={() => window.SM.client("showLoginModal")}
        />
      </Card.Body>
    </Card>
  );
};
