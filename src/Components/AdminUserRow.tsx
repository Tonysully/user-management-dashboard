import React from "react";
import { Table } from "@chakra-ui/react";
import type { IUser } from "../Types/usermanagementTypes";
import StatusBadge from "./StatusBadge";
import ViewLink from "./ViewLink";

type AdminUserRowProps = {
  user: IUser;
};

const AdminUserRow = ({ user }: AdminUserRowProps) => (
  <Table.Row>
    <Table.Cell>
      {user.firstName} {user.lastName}
    </Table.Cell>
    <Table.Cell>{user.role?.name ?? "N/A"}</Table.Cell>
    <Table.Cell>{user.email}</Table.Cell>
    <Table.Cell>
      {new Date(user.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </Table.Cell>
    <Table.Cell>
      <StatusBadge isActive={user.active} />
    </Table.Cell>
    <Table.Cell>
      <ViewLink />
    </Table.Cell>
  </Table.Row>
);

export default AdminUserRow;
