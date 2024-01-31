import { useMyStore } from "@/common";
import { Spin } from "antd";

export const MyLoading = () => {
  const { snap } = useMyStore();

  return (
    <>
      {snap.session.count > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};
