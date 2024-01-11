import React, { type FC, useState } from "react";
import { decodeJwt } from "jose";
import Card from "@semcore/ui/card";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";

interface Props {
  jwtFromUrl: string;
}

export const JWTCard: FC<Props> = (props) => {
  const [responseText, setResponseText] = useState("");
  const [spinnerOn, setSpinnerOn] = useState(false);

  const handleClick = (): void => {
    setSpinnerOn(true);
    window.SM.client("getAccessToken")
      .then((data: string) => {
        setResponseText(data);
      })
      .catch((error: Error) => {
        setResponseText(error.message);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>JWT data from url parameters</Card.Title>
        <Card.Description>
          This is JWT that frontend got from url parameters. It will be valid
          for 5 minutes from last page reload.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <CodeSnippet
          code={JSON.stringify(decodeJwt(props.jwtFromUrl), null, 4)}
          mt={0}
        />

        <WidgetButton
          buttonText="Get fresh JWT"
          codeText='SM.client("getAccessToken")'
          onClick={handleClick}
          loading={spinnerOn}
          disabled={spinnerOn}
        />

        {responseText && (
          <CodeSnippet
            code={JSON.stringify(decodeJwt(responseText), null, 4)}
          />
        )}
      </Card.Body>
    </Card>
  );
};
