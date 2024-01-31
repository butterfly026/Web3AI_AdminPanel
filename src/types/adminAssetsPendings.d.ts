export interface IAdminAssetsPendings {
  id: number
  users_id: number
  type: string
  coins_id: number
  symbol: string
  icon: string
  balance: string
  staking_ended_at: string | undefined
  pending_type: string
  pending_fee: string
  reward_loyalty_amount: string
  pending_status: string
  pending_withdrawal_type: string | undefined
  pending_withdrawal_approve_users: string | undefined
  pledge_profits_id: string | undefined
  web3_transactions_id: number
  created_at: string
  updated_at: string
  user: User
}

export interface User {
  id: number
  platform: string
  address: string
  invite_code: string
  vips_id: number
  referral_url: string | undefined
  parent_1_id: number
  parent_2_id: string | undefined
  parent_3_id: string | undefined
  email: string
  email_verified_at: string | undefined
  avatar: string
  nickname: string
  bio: string | undefined
  phone_number: string | undefined
  facebook: string | undefined
  telegram: string | undefined
  wechat: string | undefined
  skype: string | undefined
  whatsapp: string | undefined
  line: string | undefined
  zalo: string | undefined
  profile_verified_at: string | undefined
  profile_status: string
  profile_error_message: string | undefined
  full_name: string | undefined
  id_no: string | undefined
  country: string | undefined
  city: string | undefined
  id_front_img: string | undefined
  id_reverse_img: string | undefined
  identity_verified_at: string | undefined
  identity_status: string
  identity_error_message: string | undefined
  can_automatic_trade: number
  can_trail_bonus: number
  can_automatic_exchange: number
  can_email_notification: number
  can_leveraged_investment: number
  can_automatic_loan_repayment: number
  can_prevent_liquidation: number
  prevent_liquidation_amount: string
  can_profit_guarantee: number
  can_automatic_airdrop_bonus: number
  can_automatic_staking: number
  staking_type: string | undefined
  can_automatic_withdrawal: number
  automatic_withdrawal_amount: string
  can_say: number
  staking: string
  withdrawable: string
  total_balance: string
  total_rate: string
  total_staking_amount: string
  total_withdraw_amount: string
  total_income: string
  total_actual_income: string
  total_loyalty_value: string
  total_today_loyalty_value: string
  referral_count: number
  first_staking_time: string
  leverage: number
  duration: number
  show_card_at: string
  trailed_at: string
  status: string
  created_at: string
  updated_at: string
}
