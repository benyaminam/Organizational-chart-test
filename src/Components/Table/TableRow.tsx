import React from "react";
import { UserType } from "../../types";
import { Button, Checkbox, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";

type Props = {
  user: UserType;
  key: string;
  onDefaultChange: (userTitle: string) => void;
  onDelete: (userTitle: string) => void;
};

function TableRow({ user, key, onDefaultChange, onDelete }: Props) {
  const deleteContent = (
    <div style={{ cursor: "pointer" }} onClick={() => onDelete(user.title)}>
      حذف
    </div>
  );

  const handleCheckboxChange = () => {
    onDefaultChange(user.title);
  };

  return (
    <tr>
      <td>
        <Popover trigger="click" content={deleteContent} placement="bottom">
          <Button size="small" type="text">
            {" "}
            <MoreOutlined />{" "}
          </Button>
        </Popover>
      </td>
      <td>
        <Checkbox checked={user?.isDefault} onChange={handleCheckboxChange} />
      </td>
      <td>{user.title}</td>
    </tr>
  );
}

export default TableRow;
