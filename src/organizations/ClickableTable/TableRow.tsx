import { Tr, Td } from "@chakra-ui/react";
import { MouseEventHandler, useState } from "react";

export type Datum<T> = T & {
  id: string;
  onClick?: MouseEventHandler;
};

export type TableRowProps<T> = {
  datum: Datum<T>;
  cols: (keyof Datum<T>)[];
};

const TableRow = <T,>({ datum, cols }: TableRowProps<T>) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter: MouseEventHandler = () => {
    setHover(true);
  };

  const onMouseLeave: MouseEventHandler = () => {
    setHover(false);
  };

  return (
    <Tr
      onClick={datum.onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      backgroundColor={hover ? "orange" : "white"}
      cursor={datum.onClick ? "pointer" : "auto"}
    >
      {cols.map((col) => (
        <Td key={`${datum.id}-${String(col)}`}>{`${datum[col]}`}</Td>
      ))}
    </Tr>
  );
};

export default TableRow;
