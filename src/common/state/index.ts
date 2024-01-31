import { proxy, snapshot, subscribe, useSnapshot } from "umi";
export * from "./actions";

function proxyWithPersist<V>(
  val: V,
  opts: {
    key: string;
  }
) {
  const local = localStorage.getItem(opts.key);
  const state = proxy(local ? JSON.parse(local) : val);
  subscribe(state, () => {
    localStorage.setItem(opts.key, JSON.stringify(snapshot(state)));
  });
  return state;
}

type StorageType = {
  access_token: number;
};
const storage: StorageType = proxyWithPersist(
  {
    access_token: "0",
  },
  {
    key: process.env.TOKEN_NAME as string,
  }
);

type SessionType = {
  count: number;
  user: any;
  permissions: any;
};
const session: SessionType = proxy({
  count: 0, // loading count
  user: undefined, // userinfo
  permissions: undefined, // permissions
});

export type StateType = {
  storage: StorageType;
  session: SessionType;
};

export const state: StateType = proxy({
  storage,
  session,
});

export const useMyStore = () => {
  const snap = useSnapshot<StateType>(state);

  return { snap };
};
