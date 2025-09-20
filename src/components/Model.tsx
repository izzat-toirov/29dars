import { Button, Checkbox, Form, Input, InputNumber, Modal, Tag, Space } from "antd";
import { memo, useEffect, useState } from "react";
import type { FieldType } from "../types";
import type { FormProps } from "antd";

type ModelProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onFinish: FormProps<FieldType>["onFinish"];
  onFinishFailed: FormProps<FieldType>["onFinishFailed"];
  editingItem?: FieldType | null;
};

const Model: React.FC<ModelProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onFinish,
  onFinishFailed,
  editingItem,
}) => {
  const [form] = Form.useForm<FieldType>();
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (editingItem) {
      form.setFieldsValue(editingItem);
      setItems(editingItem.memories || []);
    } else {
      form.resetFields();
      setItems([]);
    }
  }, [editingItem, form]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (removedItem: string) => {
    const newTags = items.filter((item) => item !== removedItem);
    setItems(newTags);
  };

  return (
    <Modal footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish?.({ ...values, memories: items, id: editingItem?.id });
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Nomi"
          name="title"
          rules={[{ required: true, message: "Nomini kiriting!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Narxi"
          name="price"
          rules={[{ required: true, message: "Narxni kiriting!" }]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Rasm"
          name="image"
          rules={[{ required: true, message: "Rasm URL kiritish shart!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Eslatma">
          <Space wrap style={{ marginBottom: 8 }}>
            {items.map((item, idx) => (
              <Tag key={idx} color="blue" closable onClose={() => handleRemove(item)}>
                {item}
              </Tag>
            ))}
          </Space>

          <div style={{ display: "flex", gap: "8px" }}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleAdd}
            />
            <Button type="primary" onClick={handleAdd}>
              +
            </Button>
          </div>
        </Form.Item>

        <Form.Item<FieldType>
          label="Yetkazib berish bormi?"
          name="isDelivery"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            {editingItem ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(Model);
