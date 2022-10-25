import type { NextPage } from "next";

import UserTable from "components/UserTable";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Users</h1>
      <UserTable />
    </div>
  );
};

export default Home;
