import { memo, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Card, Space, Typography } from 'antd';
import type { FieldType } from '../types';
import Model from './Model';
import { usePhone } from '../api/hooks/useTeacher';

const Phone: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getPhone, createPhone, deletePhone, uptadePhone } = usePhone();
  const { data } = getPhone();
  const [editingItem, setEditingItem] = useState<FieldType | null>(null);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      if (editingItem) {
        await uptadePhone.mutateAsync({ id: editingItem.id, ...values });
      } else {
        await createPhone.mutateAsync(values);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Saqlashda xatolik:', err);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleUpdate = (item: FieldType) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-5 mx-auto">
      <div className="bg-slate-200 p-4 rounded-lg flex justify-between">
        <Typography.Title level={3}>Phone CRUD</Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            setEditingItem(null); // create mode
            setIsModalOpen(true);
          }}
        >
          +
        </Button>
      </div>

      <Model
        isModalOpen={isModalOpen}
        handleOk={() => setIsModalOpen(false)}
        handleCancel={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        editingItem={editingItem} // ⬅️ yuborildi
      />

      <Space direction="vertical" size={16}>
        <Card
          title="Default size card"
          style={{ width: 900 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.map((i: any) => (
              <Card
                key={i.id}
                hoverable
                cover={
                  <img
                    src={i.image}
                    alt={i.title || 'Phone image'}
                    className="object-cover h-52 w-full"
                  />
                }
                className="flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{i.title}</h3>
                  <p className="text-gray-600">
                    {i.price ? `$${i.price}` : 'No price'}
                  </p>
                  <p>{i.isDelivery ? 'Delivery ✅' : 'Delivery ❌'}</p>

                  {i.memories && i.memories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {i.memories.map((item: string) => (
                        <span
                          key={item}
                          className="bg-slate-200 px-3 py-1 text-xs rounded-xl"
                        >
                          #{item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button danger block onClick={() => deletePhone.mutate(i.id)}>
                    Delete
                  </Button>
                  <Button
                    type="default"
                    block
                    onClick={() => handleUpdate(i)}
                  >
                    Update
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Space>
    </div>
  );
};

export default memo(Phone);
