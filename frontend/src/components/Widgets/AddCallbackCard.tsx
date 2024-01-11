import React, { type FC, useState } from "react";
import Card from "@semcore/ui/card";
import LinkIcon from "@semcore/ui/icon/LinkExternal/m";
import Link from "@semcore/ui/link";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

export const AddCallbackCard: FC = () => {
  const [onUrlPopMsg, setOnUrlPopMsg] = useState("");

  const handleOnUrlPopCbClick = () => {
    window.SM.addCallback("onUrlPop", (newUrl) => {
      console.log("new url is:", newUrl);
    });

    setOnUrlPopMsg(
      "Callback has been added.\n" +
        "Try to push url in the widget above.\n" +
        "Then click the back and forward button in the browser and see logs in the browser devtools console",
    );
  };

  return (
    <Card mt={3}>
      <Card.Header>
        <Card.Title>
          <Link
            href="https://www.semrush.com/apps/docs/js-sdk-reference/sm-addcallback"
            target="_blank"
            rel="noreferrer"
          >
            <Link.Text>addCallback</Link.Text>
            <Link.Addon>
              <LinkIcon />
            </Link.Addon>
          </Link>
        </Card.Title>
        <Card.Description>
          Subscribes to browser events and executes your functions when they are
          triggered.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <WidgetButton
          buttonText="Add onUrlPop Callback"
          codeText={`SM.addCallback("onUrlPop", (url) => { console.log(url) })`}
          onClick={handleOnUrlPopCbClick}
          mt={0}
        />

        {onUrlPopMsg && <CodeSnippet code={onUrlPopMsg} language="json" />}
      </Card.Body>
    </Card>
  );
};
