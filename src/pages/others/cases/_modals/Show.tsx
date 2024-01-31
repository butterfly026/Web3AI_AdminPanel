import { MyDescriptions, MyModalDataContext } from '@/common';
import MDEditor from '@uiw/react-md-editor';
import { Button, Descriptions, List, Space, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { request } from 'umi';
export default ({ actions, onClose }: any) => {
  console.log(actions);
  const item = useContext(MyModalDataContext);
  const [getDetInfo, setDetInfo] = useState<any>({});
  const [value, setValue] = useState<string>('');
  const api = {
    show: () => {
      request('cases/show', {
        data: { id: item?.id },
      }).then((res) => {
        setDetInfo(res?.data);
      });
    },
    edit: (content: string) => {
      request('cases/update', {
        data: { id: item?.id, content: value, status: item?.status },
      }).then((res) => {
        setDetInfo(res?.data);
      });
    },
    delete: () => {
      request('cases/delete', {
        data: { id: item?.id },
      }).then((res) => {
        setDetInfo(res?.data);
      });
    },
    detailEdit: (id: number, answer: string) => {
      request('case_details/update', {
        data: { id, answer },
      }).then((res) => {
        setDetInfo(res?.data);
      });
    },
    detailDelete: (id: number) => {
      request('case_details/delete', {
        data: { id },
      }).then((res) => {
        setDetInfo(res?.data);
      });
    },
  };
  useEffect(() => {
    api.show();
  }, []);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCase, setEditingCase] = useState<boolean>(false);

  const handleDetailEdit = (
    index: number,
    detailId: number,
    answer: string,
    status: boolean
  ) => {
    if (status) {
      value && api.detailEdit(detailId, value);
      setValue('');
      setEditingIndex(null);
      return api.show();
    }

    setValue(answer);
    setEditingIndex(index);
  };

  const handleEditorChange = (value?: string, index?: number) => {
    console.log(value, index);

    if (!index === undefined) return;
    setValue(value || '');
  };

  const handleDetailDelete = (detailId: number) => {
    api.detailDelete(detailId);
    return api.show();
  };

  const handleCaseDelete = () => {
    api.delete();
    actions.reload();
    onClose();
  };

  const handleCaseEdit = (editingCase: boolean) => {
    if (!editingCase) {
      setValue(item?.content);
      return setEditingCase(!editingCase);
    }

    value && api.edit(value);
    setValue('');
    setEditingCase(!editingCase);
    return setTimeout(api.show, 500);
  };

  return (
    <>
      <Space direction='vertical' style={{ display: 'flex' }}>
        <Descriptions bordered column={2} layout='vertical'>
          <Descriptions.Item label='Subject'>
            {getDetInfo?.subject}
          </Descriptions.Item>
          <Descriptions.Item label='Content'>
            {editingCase ? (
              <MDEditor
                style={{ width: 700 }}
                value={value}
                onChange={(val) => handleEditorChange(val, item?.id)}
                preview={'edit'}
                hideToolbar={true}
                data-color-mode='light'
                highlightEnable={false}
              />
            ) : (
              getDetInfo?.content
            )}
          </Descriptions.Item>
          <Descriptions.Item label='Created'>
            {getDetInfo?.created_at}
          </Descriptions.Item>
          <Descriptions.Item label='User Id'>
            {/* {getDetInfo?.users_id} */}
            <MyDescriptions.user {...getDetInfo?.user} />
          </Descriptions.Item>
          <Descriptions.Item label='Full name'>
            {getDetInfo?.user?.full_name}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions bordered column={1} layout='vertical'>
          <Descriptions.Item label='Answer'>
            <List
              itemLayout='horizontal'
              dataSource={getDetInfo?.case_details}
              renderItem={(item: any, index: number) => (
                <List.Item style={{flexDirection: "column"}}
                  actions={[
                    ...(item?.users_id
                      ? [<Tag color='#87d068'>User reply</Tag>]
                      : [<Tag color='#108ee9'>Customer service reply</Tag>]),
                    <Button
                      type='link'
                      onClick={() =>
                        handleDetailEdit(
                          index,
                          item.id,
                          item?.answer,
                          editingIndex === index
                        )
                      }
                    >
                      {editingIndex === index ? 'Finish' : 'Edit'}
                    </Button>,
                    <Button
                      type='link'
                      onClick={() => handleDetailDelete(item.id)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  {editingIndex === index ? (
                    <MDEditor
                      style={{ width: 700 }}
                      value={value}
                      onChange={(val) => handleEditorChange(val, index)}
                      preview={'edit'}
                      hideToolbar={!!item?.users_id}
                      data-color-mode='light'
                      highlightEnable={false}
                    />
                  ) : (
                    <MDEditor.Markdown
                      source={item.answer}
                      wrapperElement={{
                        'data-color-mode': 'light',
                      }}
                      style={{ whiteSpace: 'pre-wrap' }}
                    />
                  )}
                </List.Item>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => handleCaseEdit(editingCase)}
          >
            {editingCase ? 'Finish' : 'Edit'}
          </Button>
          <Button onClick={handleCaseDelete}>Delete</Button>
        </div>
      </Space>
    </>
  );
};
