import { AutoComplete, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getUsers } from "../../transportLayer";
import { NodeType } from "../../types";

interface prop {
  selectedNode: NodeType | [];
  setSelectedItem: React.Dispatch<any>;
}
const UserAutoComplete: React.FC<prop> = ({
  selectedNode,
  setSelectedItem,
}) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    });
  }, []);

  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter((o) => o.label.indexOf(searchText) > -1)
    );
  };

  const onSelect = (data: string) => {
    console.log("test", data);
  };

  const handleAddUser = () => {
    const userExists = (selectedNode as NodeType).users.some(
      (user: { title: string }) => user.title === text
    );

    if (userExists) {
      alert("این یوزر برای این نود وجود دارد");
      return;
    }
    if (text === "") {
      alert("کاربری انتخاب نشده است!");
      return;
    }

    setSelectedItem({
      ...selectedNode,
      users: [
        ...(selectedNode as NodeType).users,
        { title: text, isDefault: false },
      ],
    });
  };

  return (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      <AutoComplete
        options={options}
        style={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e)}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={handleAddUser}>افزودن</Button>
    </div>
  );
};

export default UserAutoComplete;
