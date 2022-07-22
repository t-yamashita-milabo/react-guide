import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import TableRow, { Datum } from "./TableRow";

export type ClickableTableProps<T> = {
  header: string[];
  cols: (keyof Datum<T>)[];
  data: Datum<T>[];
};

const ClickableTable = <T,>({
  header,
  cols,
  data,
}: PropsWithChildren<ClickableTableProps<T>>) => (
  <Table>
    <Thead>
      <Tr>
        {header.map((h) => (
          <Th key={h}>{h}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {data.map((d) => (
        <TableRow key={d.id} datum={d} cols={cols} />
      ))}
    </Tbody>
  </Table>
);

export default ClickableTable;
