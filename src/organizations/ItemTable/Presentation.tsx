import { FC, MouseEventHandler } from "react";
import { Table, Tbody, Thead, Tr, Th, Td, Link } from "@chakra-ui/react";
import { Item } from "models/item";

const headers = ["ID", "アイテム名", "価格"] as const;

type Props = {
  data: (Item & { onClick: MouseEventHandler })[];
};

const Presentation: FC<Props> = ({ data }) => (
  <Table>
    <Thead>
      <Tr>
        {headers.map((header) => (
          <Th key={header}>{header}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td onClick={item.onClick}>
            <Link>{item.itemName}</Link>
          </Td>
          <Td>{item.price}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default Presentation;
