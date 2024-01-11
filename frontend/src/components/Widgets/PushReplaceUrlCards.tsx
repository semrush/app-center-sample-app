import React, { type FC, useState } from "react";
import Input from "@semcore/ui/input";
import Card from "@semcore/ui/card";
import LinkIcon from "@semcore/ui/icon/LinkExternal/m";
import Link from "@semcore/ui/link";
import { Flex } from "@semcore/ui/flex-box";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

export const PushReplaceUrlCards: FC = () => {
  const [url, setUrl] = useState("/url");
  const [pushUrlMessage, setPushUrlMessage] = useState("");
  const [replaceUrlMessage, setReplaceUrlMessage] = useState("");

  const handleClick = (isReplace: boolean): void => {
    const stateToSave = { urlInInput: url };

    if (isReplace) {
      window.SM.client("replaceUrl", url, { state: stateToSave });
      setReplaceUrlMessage(
        "Url has been replaced. Look at browser address bar",
      );
    } else {
      window.SM.client("pushUrl", url, { state: stateToSave });
      setPushUrlMessage(
        "Url has been pushed. Look at browser address bar and browser history",
      );
    }
  };

  return (
    <>
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
          <Flex direction="column">
            <Input size="l" w={300}>
              <Input.Addon>url:</Input.Addon>
              <Input.Value onChange={setUrl} value={url} />
            </Input>

            <WidgetButton
              buttonText="Push Url"
              codeText='SM.client("pushUrl", url)'
              onClick={() => handleClick(false)}
            />

            {pushUrlMessage && (
              <CodeSnippet code={pushUrlMessage} language="json" />
            )}
          </Flex>
        </Card.Body>
      </Card>

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
            onClick={() => handleClick(true)}
          />

          {replaceUrlMessage && (
            <CodeSnippet code={replaceUrlMessage} language="json" />
          )}
        </Card.Body>
      </Card>
    </>
  );
};
