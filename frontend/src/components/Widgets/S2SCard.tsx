import React, { type FC, useState, useCallback } from "react";
import Card from "@semcore/ui/card";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";
import { decodeJwt } from "jose";

export const S2SCard: FC = () => {
  const [issuerText, setIssuerText] = useState("");
  const [spinnerIssuerOn, setSpinnerIssuerOn] = useState(false);

  const handleIssuerClick = useCallback(() => {
    setSpinnerIssuerOn(true);

    window.SM.client("getAccessToken")
      .then((token: string) => {
        return fetch(`/s2s/issuer?jwt=${token}`, { method: "GET" });
      })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        const formattedResp = JSON.stringify(decodeJwt(text), null, 4);

        setIssuerText(formattedResp);
        setSpinnerIssuerOn(false);
      })
      .catch((error) => {
        setIssuerText(error);
      })
      .finally(() => {
        setSpinnerIssuerOn(false);
      });
  }, []);

  const [viewerStatusText, setViewerStatusText] = useState("");
  const [spinnerViewerStatusOn, setSpinnerViewerStatusOn] = useState(false);

  const handleViewerStatusClick = useCallback(() => {
    setSpinnerViewerStatusOn(true);

    window.SM.client("getAccessToken")
      .then((token: string) => {
        return fetch(`/s2s/viewer_status?jwt=${token}`, { method: "GET" });
      })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setViewerStatusText(text);
        setSpinnerIssuerOn(false);
      })
      .catch((error) => {
        setViewerStatusText(error);
      })
      .finally(() => {
        setSpinnerViewerStatusOn(false);
      });
  }, []);

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>Server-to-Server API</Card.Title>
      </Card.Header>
      <Card.Body>
        <WidgetButton
          buttonText="Get JWT from Issuer"
          codeText="S2S API"
          onClick={handleIssuerClick}
          loading={spinnerIssuerOn}
          disabled={spinnerIssuerOn}
          mt={0}
        />

        {issuerText && <CodeSnippet code={issuerText} mb={4} />}

        <WidgetButton
          buttonText="Get Viewer Status Report"
          codeText="S2S API"
          onClick={handleViewerStatusClick}
          loading={spinnerViewerStatusOn}
          disabled={spinnerViewerStatusOn}
        />

        {viewerStatusText && <CodeSnippet code={viewerStatusText} />}
      </Card.Body>
    </Card>
  );
};
