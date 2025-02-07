import { Button, Checkbox, Popover } from "antd";
import "./table.css";
import { NodeType, UserType } from "../../types";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
interface Props {
  selectedNode: NodeType | [];
  setSelectedItem: React.Dispatch<any>;
}
function Table({ selectedNode, setSelectedItem }: Props) {
  const { users, key } = JSON.parse(JSON.stringify(selectedNode));
  const handleDefaultChange = (userTitle: string) => {
    setSelectedItem({
      ...selectedNode,
      users: [
        ...(users as UserType[]).map((user: UserType) =>
          user.title === userTitle
            ? { ...user, isDefault: true }
            : { ...user, isDefault: false }
        ),
      ],
    });
  };
  const handleDelete = (userTitle: string) => {
    const updatedUsers = (users as UserType[]).filter(
      (user: UserType) => user.title !== userTitle
    );

    // Check if there is no isDefault user
    const hasDefaultUser = updatedUsers.some((user) => user.isDefault);
    if (!hasDefaultUser && updatedUsers.length > 0) {
      updatedUsers[0].isDefault = true;
    }

    setSelectedItem({
      ...selectedNode,
      users: updatedUsers,
    });
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <TableHead />
        <tbody>
          {users?.map((user: UserType) => (
            <TableRow
              key={key}
              user={user}
              onDefaultChange={handleDefaultChange}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
