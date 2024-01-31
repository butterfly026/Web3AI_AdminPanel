import { message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import { state } from "../../state/index";

export default ({
  size = 1,
  fileType = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"],
  prefix = "categories",
  defaultFileList,
  onChangeFile,
}: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    setFileList([file]);
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = (info: any) => {
    console.log(info, "base64");
    if (info.file.status == "removed") {
      onChangeFile({ url: "" });
      setFileList([]);
      return false;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setFileList([
          { name: info?.file?.name, uid: info?.file?.uid, url: url },
        ]);
        onChangeFile({ url: url });
      });
    }
  };
  const onCustomRequest = (info: any) => {
    getBase64(info.file as RcFile, (url) => {
      setFileList([{ name: info?.file?.name, uid: info?.file?.uid, url: url }]);
      onChangeFile({ url: url });
    });
    console.log(info, "info");
  };

  const onRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    console.log(file, "remove");
  };
  useEffect(() => {
    if (defaultFileList) {
      setFileList(defaultFileList);
    }
  }, [defaultFileList]);
  return (
    <Upload
      maxCount={size}
      listType="picture-card"
      fileList={fileList}
      data={{ prefix: prefix }}
      beforeUpload={beforeUpload}
      customRequest={onCustomRequest}
      onPreview={onPreview}
      // onChange={handleChange}
      onRemove={onRemove}
    >
      {fileList.length >= size ? null : "+ Upload"}
    </Upload>
  );
};
