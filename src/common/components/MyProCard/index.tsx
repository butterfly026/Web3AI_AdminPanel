import { ProCard } from "@ant-design/pro-components";
import { useState } from "react";
import { history } from "umi";
export default ({ url, tabs }: any) => {
  const [key, setKey] = useState(() => {
    return history.location.pathname.split("/").slice(-1)[0];
  });
  return (
    <ProCard
      tabs={{
        type: "card",
        activeKey: key,
        onChange: (key) => {
          setKey(key);
          history.push(`${url}${key}`);
        },
      }}
    >
      {tabs?.map((item: string) => {
        return <ProCard.TabPane key={item} tab={item} />;
      })}
    </ProCard>
  );
};
