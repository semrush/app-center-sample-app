import React, { type FC, useState } from "react";
import Input from "@semcore/ui/input";
import Card from "@semcore/ui/card";
import LinkIcon from "@semcore/ui/icon/LinkExternal/m";
import Link from "@semcore/ui/link";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

export const ReplaceUrlCard: FC = () => {
  const [url, setUrl] = useState("/url");
  const [message, setMessage] = useState("");

  const handleClick = (): void => {
    const stateToSave = { urlInInput: url };

    window.SM.client("replaceUrl", url, { state: stateToSave });
    setMessage("Url has been replaced. Look at browser address bar");
  };

  return (
    <Card mt={3}>
      <Card.Header>
        <Card.Title>
          <Link
            href="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#replaceurl"
            target="_blank"
            rel="noreferrer"
          >
            replaceUrl
            <LinkIcon mx={1} />
          </Link>
        </Card.Title>
        <Card.Description>
          Changes the page URL by replacing it in the browser history.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Input size="l" w={300}>
          <Input.Addon>url:</Input.Addon>
          <Input.Value onChange={setUrl} value={url} />
        </Input>

        <WidgetButton
          buttonText="Replace Url"
          codeText='SM.client("replaceUrl", url)'
          onClick={handleClick}
        />

        {message && <CodeSnippet code={message} language="json" />}
      </Card.Body>
    </Card>
  );
};
