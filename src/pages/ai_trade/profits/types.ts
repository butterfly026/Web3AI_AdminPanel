export interface IProfitsList {
    id: number
    pledges_id: number
    users_id: number
    parent_1_id: number
    parent_2_id: any
    vips_id: number
    is_trail: number
    is_new_day: number
    datetime: string
    round: number
    staking: string
    duration: number
    lose_staking_amount: string
    apy: number
    loan_apy: number
    actual_apy: number
    actual_loan_apy: number
    income: string
    actual_income: number
    loyalty_fee: string
    loyalty_amount: string
    can_automatic_exchange: number
    manual_exchanged_at: any
    manual_exchange_fee_percent: number
    manual_exchange_fee_amount: string
    funds_detail_json: string
    exchange_status: string
    can_profit_guarantee: number
    minimum_guarantee_apy: number
    minimum_guarantee_amount: string
    profit_guarantee_amount: string
    done_profit_guarantee?: number
    deposit_total_amount: string
    deposit_loyalty_amount: string
    deposit_staking_amount: string
    deposit_status: any
    deposit_web3_transactions_id: any
    deposited_at: any
    can_leveraged_investment: number
    can_automatic_loan_repayment: number
    leverage: number
    loan_amount: string
    loan_charges: number
    loan_charges_fee: string
    can_prevent_liquidation: number
    prevent_liquidation_amount: string
    can_email_notification: number
    can_automatic_airdrop_bonus: number
    can_automatic_staking: number
    staking_type: any
    can_automatic_withdrawal: number
    automatic_withdrawal_amount: string
    child_1_total_income_eth: string
    child_2_total_income_eth: string
    created_at: string
    updated_at: string
    user: User
}

export interface User {
    id: number
    avatar: string
    email: string
    address: string
}

export interface Meta {
    total: number
    per_page: number
    current_page: number
    last_page: number
}
