import { Button, Checkbox, Form, Input, InputNumber, Modal, Tag, Space } from "antd";
import { memo, useState } from "react";
import type { FieldType } from "../types";
import type { FormProps } from "antd";

type ModelProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onFinish: FormProps<FieldType>["onFinish"];
  onFinishFailed: FormProps<FieldType>["onFinishFailed"];
};

const Model: React.FC<ModelProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onFinish,
  onFinishFailed,
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (removedItem: string) => {
    const newTags = (items.filter((item) => item !== removedItem));
    console.log(newTags);
    setItems(newTags)
    
  };

  return (
    <div className="Model">
      <Modal
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            // Eslatmalarni formaga qo‘shib yuboramiz
            onFinish?.({ ...values, memories: items });
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

          <Form.Item<FieldType> label="Eslatma" name="memories">
            <>
              {/* saqlangan eslatmalar tepada */}
              <Space wrap style={{ marginBottom: 8 }}>
                {items.map((item, idx) => (
                  <Tag
                    key={idx}
                    color="blue"
                    closable
                    onClose={() => handleRemove(item)}
                  >
                    {item}
                  </Tag>
                ))}
              </Space>

              {/* input + button yonma-yon */}
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
            </>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(Model);
