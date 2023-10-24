import React from "react";
import { useDataBaseContext } from "../../database/teste";

export default function userData() {
  const { addUser, usersAll, getAllUsers } = useDataBaseContext();
  return <div></div>;
}
