import React, { type FC, useState } from "react";
import Card from "@semcore/ui/card";
import Link from "@semcore/ui/link";
import LinkIcon from "@semcore/ui/icon/LinkExternal/m";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

export const ConfigCard: FC = () => {
  const [responseText, setResponseText] = useState("");

  const handleClick = () => {
    setResponseText(JSON.stringify(window.SM.config, null, 4));
  };

  return (
    <Card mt={3}>
      <Card.Header>
        <Card.Title>
          <Link
            href="https://www.semrush.com/apps/docs/js-sdk-reference/sm-config"
            target="_blank"
            rel="noreferrer"
          >
            <Link.Text>config</Link.Text>
            <Link.Addon>
              <LinkIcon />
            </Link.Addon>
          </Link>
        </Card.Title>
        <Card.Description>
          Get application config. This method will show layout value and
          available get parameters.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <WidgetButton
          buttonText="Get config"
          codeText="SM.config"
          onClick={handleClick}
          mt={0}
        />

        {responseText && <CodeSnippet code={responseText} />}
      </Card.Body>
    </Card>
  );
};
