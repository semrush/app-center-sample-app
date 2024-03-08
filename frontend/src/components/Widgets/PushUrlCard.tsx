import React, { type FC, useState } from "react";
import Input from "@semcore/ui/input";
import Card from "@semcore/ui/card";
import LinkIcon from "@semcore/ui/icon/LinkExternal/m";
import Link from "@semcore/ui/link";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

export const PushUrlCard: FC = () => {
  const [url, setUrl] = useState("/url");
  const [message, setMessage] = useState("");

  const handleClick = (): void => {
    const stateToSave = { urlInInput: url };

    window.SM.client("pushUrl", url, { state: stateToSave });
    setMessage(
      "Url has been pushed. Look at browser address bar and browser history",
    );
  };

  return (
    <Card mt={3}>
      <Card.Header>
        <Card.Title>
          <Link
            href="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#pushurl"
            target="_blank"
            rel="noreferrer"
          >
            <Link.Text>pushUrl</Link.Text>
            <Link.Addon>
              <LinkIcon />
            </Link.Addon>
          </Link>
        </Card.Title>
        <Card.Description>
          Changes the page URL by adding it in the browser history.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Input size="l" w={300}>
          <Input.Addon>url:</Input.Addon>
          <Input.Value onChange={setUrl} value={url} />
        </Input>

        <WidgetButton
          buttonText="Push Url"
          codeText='SM.client("pushUrl", url)'
          onClick={handleClick}
        />

        {message && <CodeSnippet code={message} language="json" />}
      </Card.Body>
    </Card>
  );
};
