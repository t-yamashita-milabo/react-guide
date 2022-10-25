import { Table, Tbody, Thead, Tr, Th, Td } from "@chakra-ui/react";

type User = {
  id: number;
  lastName: string;
  firstName: string;
  active: boolean;
};

const UserFactory = (args?: Partial<User>): User => ({
  id: 0,
  lastName: "織田",
  firstName: "信長",
  active: true,
  ...args,
});

const users = [
  UserFactory(),
  UserFactory({ id: 1, lastName: "豊臣", firstName: "秀吉" }),
  UserFactory({ id: 2, lastName: "徳川", firstName: "家康" }),
];

const headers = ["ユーザーID", "名前", "アクティブ"] as const;

const UserTable = () => (
  <Table>
    <Thead>
      <Tr>
        <Th rowSpan={2}>ユーザーID</Th>
        <Th colSpan={2}>名前</Th>
        <Th rowSpan={2}>アクティブ</Th>
      </Tr>
      <Tr>
        <Th>姓</Th>
        <Th>名</Th>
      </Tr>
    </Thead>
    <Tbody>
      {users.map((user) => (
        <Tr key={user.id}>
          <Td>{user.id}</Td>
          <Td>{user.lastName}</Td>
          <Td>{user.firstName}</Td>
          <Td>{`${user.active}`}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default UserTable;
