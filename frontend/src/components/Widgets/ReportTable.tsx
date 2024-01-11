import React, { type FC } from "react";
import DataTable from "@semcore/ui/data-table";

interface Props {
  data: ReportData;
}

type Table = {
  header: Array<string>;
  body: Array<Array<string>>;
};

export type ReportData = {
  url: string;
  tables: Array<Table>;
};

type TableComponentData = {
  header: Array<string>;
  data: Array<Record<string, string>>;
};

export const ReportTable: FC<Props> = ({ data: { tables } }) => {
  const preparedTables = tables.map(
    ({ header, body }): TableComponentData => ({
      header,
      data: body.map((row) => {
        return row.reduce<Record<string, string>>((acc, val, index) => {
          const key = header[index];
          acc[key] = val;
          return acc;
        }, {});
      }),
    }),
  );

  return (
    <>
      {preparedTables.map(({ header, data }, index) => (
        <DataTable key={index} data={data} mt={3}>
          <DataTable.Head>
            {header.map((title, index) => (
              <DataTable.Column key={index} name={title}>
                {title}
              </DataTable.Column>
            ))}
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      ))}
    </>
  );
};
