import React, { type FC, useState, useCallback } from "react";
import Card from "@semcore/ui/card";
import { WidgetButton } from "../WidgetButton";
import { CodeSnippet } from "../CodeSnippet";
import { decodeJwt } from "jose";

export const S2SCard: FC = () => {
  const [issuerText, setIssuerText] = useState("");
  const [spinnerIssuerOn, setSpinnerIssuerOn] = useState(false);

  const handleIssuerClick = useCallback(async () => {
    try {
      setSpinnerIssuerOn(true);

      const token = await window.SM.client("getAccessToken");
      const response = await fetch(`/s2s/issuer?jwt=${token}`, {
        method: "GET",
      });
      const responseText = await response.text();

      if (response.status == 200) {
        setIssuerText(JSON.stringify(decodeJwt(responseText), null, 4));
      }
    } catch (error) {
      setIssuerText(error as string);
    } finally {
      setSpinnerIssuerOn(false);
    }
  }, []);

  const [viewerStatusText, setViewerStatusText] = useState("");
  const [spinnerViewerStatusOn, setSpinnerViewerStatusOn] = useState(false);

  const handleViewerStatusClick = useCallback(async () => {
    try {
      setSpinnerViewerStatusOn(true);

      const token = await window.SM.client("getAccessToken");
      const response = await fetch(`/s2s/viewer_status?jwt=${token}`, {
        method: "GET",
      });
      const responseText = await response.text();

      if (response.status == 200) {
        setViewerStatusText(responseText);
      }
    } catch (error) {
      setViewerStatusText(error as string);
    } finally {
      setSpinnerViewerStatusOn(false);
    }
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
