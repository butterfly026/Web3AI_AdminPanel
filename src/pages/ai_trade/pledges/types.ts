export interface IPledgesData {
    id: number
    users_id: number
    is_trail: number
    started_at: string
    ended_at: string
    canceled_at: any
    staking: string
    estimate_apy: number
    actual_apy: number
    actual_loan_apy: number
    earnings_this_node: string
    earnings_today: string
    auto_joined_funds: number
    next_round_is_1: number
    status: string
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