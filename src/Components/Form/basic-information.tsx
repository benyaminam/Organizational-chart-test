import { Button, Form, Input } from "antd";
import UserAutoComplete from "./user-autocomplete";
import Table from "../Table";
import { FormSubmitType, NodeType, UserType } from "../../types";
import { useEffect } from "react";

interface Props {
  selectedNode: NodeType | [];
  onSubmit: (data: FormSubmitType) => void;
  setSelectedItem: React.Dispatch<any>;
}

function BasicInformation({ selectedNode, onSubmit, setSelectedItem }: Props) {
  const [form] = Form.useForm();
  useEffect(() => {
    if ((selectedNode as NodeType).title === undefined) return;
    form.setFieldsValue({
      title: `${(selectedNode as NodeType).title}-${"زیرشاخه"}`,
      users: (selectedNode as NodeType).users,
    });

    return () => {};
  }, [selectedNode]);

  return (
    <Form
      onFinish={(data) => {
        onSubmit(data);
        form.resetFields(["title", "key"]);
      }}
      wrapperCol={{ span: 8 }}
      form={form}
    >
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="key" label="کد" labelCol={{ span: 2 }}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete
          setSelectedItem={setSelectedItem}
          selectedNode={selectedNode ?? []}
        />
      </Form.Item>
      <Form.Item label="جدول" labelCol={{ span: 2 }}>
        <Table
          setSelectedItem={setSelectedItem}
          selectedNode={selectedNode ?? []}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          ذخیره
        </Button>
      </Form.Item>
    </Form>
  );
}
export default BasicInformation;
