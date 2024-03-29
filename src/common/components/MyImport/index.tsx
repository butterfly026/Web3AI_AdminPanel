import { UploadOutlined } from "@ant-design/icons";
import { Button, notification, Space, Upload } from "antd";
import { useState } from "react";
import { request } from "umi";
type NotificationType = "success" | "info" | "warning" | "error";
export const MyImport = ({ actions, onChange }: any) => {
  const [getFileList, setFileList] = useState({});
  const onNotification = (type: NotificationType, des: string) => {
    notification[type]({
      message: "提示",
      description: des,
    });
  };
  const files: any = {
    beforeUpload: (file: any) => {
      setFileList(file);
      return false;
    },
  };
  const handleUpload = async () => {
    const fileList = [getFileList];
    const formData = new FormData();
    console.log(actions, "companies_id");
    formData.append("method", "upload");

    fileList.forEach((file: any) => {
      formData.append("upload_file", file);
    });
    if (actions?.type == "custom") {
      formData.append("menu_batches_id", actions?.menu_batches_id);
      formData.append("companies_id", actions?.companies_id);
      onHandleUpload(formData);
      return;
    }
    actions?.batch_store(formData, "");
    return Promise.resolve();
  };
  const onDownloadFun = async () => {
    if (actions?.type == "custom") {
      onBatchStore(
        { method: "download", menu_batches_id: 0, companies_id: 1 },
        2
      );
      return;
    }
    actions?.batch_store({ method: "download" }, "blob");
  };
  const onBatchStore = (data: any, type: number) => {
    request(actions?.ApiUrl, {
      data: data,
      responseType: "blob",
    }).then(() => {
      if (type == 1) {
        return Promise.resolve();
      }
    });
  };
  const onHandleUpload = (data: any) => {
    request(actions?.ApiUrl, {
      data: data,
    }).then(() => {
      onChange();
    });
  };
  return (
    <>
      <div>
        <span>选择导入文件：</span>
        <Upload {...files}>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
      </div>
      <div style={{ padding: "40px 0 30px 0", display: "flex" }}>
        <Space>
          <Button key="DownloadButton" onClick={() => onDownloadFun()}>
            下载模版
          </Button>
          <Button type="primary" onClick={() => handleUpload()}>
            导入
          </Button>
        </Space>
      </div>
    </>
  );
};
