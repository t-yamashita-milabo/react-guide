import axios from "axios";

import { User } from "models/user";

export const fetchUsers = async (): Promise<User[]> =>
  (await axios.get("http://localhost/users")).data;
