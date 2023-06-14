import { useEffect, useState } from 'react'
import './App.css'
import { Country, CountryService ,ApiError} from './services';
import { DatePicker } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

/*
interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}*/
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Country;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
function App() {
//hook usestate
const [dataCountry,setDataCountry] = useState<Country[]>([]);
const [error, setError] =useState<ApiError>();
const [form] = Form.useForm();
const [data, setData] = useState(dataCountry);
const [editingKey, setEditingKey] = useState<String| undefined>('');

//hooh useeffect ejecutar cuando inicia por primera vez

useEffect(() => {
CountryService.getApiCountry()
.then((data) => setDataCountry(data))
.catch((error)=> setError(error));
}, []);
const isEditing = (record: Country) => record.id === editingKey;

const edit = (record: Country) => {
  form.setFieldsValue({ name: '',  ...record });
  setEditingKey(record.id);
};

const cancel = () => {
  setEditingKey('');
};

const save = async (key: String | undefined) => {
  try {
    const row = (await form.validateFields()) as Country;

    const newData = [...data];
    const index = newData.findIndex((item) => key === item.id);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setData(newData);
      setEditingKey('');
    } else {
      newData.push(row);
      setData(newData);
      setEditingKey('');
    }
  }
   catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};

const columns = [
  {
    title: 'Country name',
    dataIndex: 'nombre',
    width: '25%',
    editable: true,
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_: any, record: Country) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    },
  },
];

const mergedColumns = columns.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record: Country) => ({
      record,
      inputType: col.dataIndex === 'age' ? 'number' : 'text',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  };
});
  return (
    <>
    <h1>Country</h1> 
   
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataCountry}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey="id"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  )
}

export default App
