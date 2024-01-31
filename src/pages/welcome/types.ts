export interface IReportResponse {
  code: number;
  message: string;
  data: IReportData;
}

export interface IReportData {
  today: IReportToday;
  all: IReportAll;
}

export interface IReportToday {
  id: number;
  day: string;
  staking_amount: string;
  withdraw_amount: string;
  exchange_airdrop_amount: string;
  deposit_staking_amount: string;
  staking_reward_loyalty_amount: string;
  income_amount: string;
  actual_income_amount: string;
  withdrawable_amount: string;
  user_register_count: number;
  user_login_count: number;
  trail_count: number;
  staking_count: number;
  withdraw_count: number;
  exchange_airdrop_count: number;
  deposit_staking_count: number;
  staking_reward_loyalty_count: number;
  income_count: number;
  actual_income_count: number;
  withdrawable_count: number;
  created_at: string;
  updated_at: string;
}

export interface IReportAll {
  staking_amount: number;
  withdraw_amount: number;
  exchange_airdrop_amount: number;
  deposit_staking_amount: number;
  staking_reward_loyalty_amount: number;
  income_amount: number;
  actual_income_amount: number;
  withdrawable_amount: number;
  user_register_count: number;
  user_login_count: number;
  trail_count: number;
  staking_count: number;
  withdraw_count: number;
  exchange_airdrop_count: number;
  deposit_staking_count: number;
  staking_reward_loyalty_count: number;
  income_count: number;
  actual_income_count: number;
  withdrawable_count: number;
}
