import { memo, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Card, Space, Typography } from 'antd';
import type { FieldType } from '../types';
import Model from './Model';
import { usePhone } from '../api/hooks/useTeacher';

const Phone: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getPhone, createPhone, deletePhone } = usePhone();
  const { data } = getPhone();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await createPhone.mutateAsync(values); // ✅ to‘g‘ri ishlatish
      setIsModalOpen(false);
    } catch (err) {
      console.error('Yaratishda xatolik:', err);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container mt-5 mx-auto">
      <div className="bg-slate-200 p-4 rounded-lg flex justify-between">
        <Typography.Title level={3}>Phone CRUD</Typography.Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          +
        </Button>
      </div>

      <Model
        isModalOpen={isModalOpen}
        handleOk={() => setIsModalOpen(false)}
        handleCancel={() => setIsModalOpen(false)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />

      <Space direction="vertical" size={16}>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          {data?.map((i: any) => (
        <div key={i.id}>
          <h3>{i.title}</h3>
          <p>{i.price}</p>
          <h3 className='flex flex-wrap gap-3'>
          {
              i?.memories?.map((item:string, inx:string)=>(
                <span key={inx} className='bg-slate-300 px-3 text-sm rounded-xl'>#{item}</span>

              ))
            }
          </h3>
          <Button danger onClick={() => deletePhone.mutate(i.id)}>
            Delete
          </Button>
        </div>
        ))}
        </Card>
      </Space>
    </div>
  );
};

export default memo(Phone);
