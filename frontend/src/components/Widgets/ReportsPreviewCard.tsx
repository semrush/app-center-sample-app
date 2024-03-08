import Card from "@semcore/ui/card";
import SpinContainer from "@semcore/ui/spin-container";
import React, { type FC, useEffect, useState } from "react";
import { type ReportData, ReportTable } from "./ReportTable";
import { CodeSnippet } from "../CodeSnippet";

interface Props {}

export const ReportsPreviewCard: FC<Props> = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [reportData, setReportData] = useState<ReportData>();
  const [errorData, setErrorData] = useState("");

  const fetchReport = async () => {
    try {
      const token = await window.SM.client("getAccessToken");
      const response = await fetch("/api/report", {
        method: "GET",
        headers: { jwt: token },
      });
      const json = await response.json();

      setReportData(json);
    } catch (error) {
      setErrorData((error as Error).message);
      console.error(error);
    } finally {
      setSpinnerOn(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <Card my={3}>
      <Card.Header>
        <Card.Title>Periodic email reports preview</Card.Title>
        <Card.Description>
          This card displays previews of periodic reports. Since these reports
          contain links to the report pages, you need to prepare a page within
          your application where users can view the web version of the report.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <SpinContainer size="l" loading={spinnerOn} hMin={40}>
          {errorData && <CodeSnippet code={errorData} mt={0} />}
          {reportData !== undefined ? <ReportTable data={reportData} /> : null}
        </SpinContainer>
      </Card.Body>
    </Card>
  );
};
