import { MyTag } from "@/common";

export default {
  SysPermissionsType: ({ value }: any) => {
    return (
      <MyTag
        colors={{ 目录: "red", 页面: "blue", 按钮: "cyan" }}
        value={value}
      />
    );
  },
  Boolean: ({ value }: { value: string }) => {
    return (
      <MyTag
        colors={{ 是: "#7cb305", 否: "#bfbfbf" }}
        value={value ? "是" : "否"}
      />
    );
  },
  CasesBackendIsNew: ({ value }: { value: string }) => {
    return (
      <MyTag
        colors={{ 已处理: "#108ee9", 未处理: "#f50" }}
        value={value ? "未处理" : "已处理"}
      />
    );
  },
  Platform: ({ value }: { value: string }) => {
    return <MyTag colors={{ ERC20: "blue", TRC20: "red" }} value={value} />;
  },
};
