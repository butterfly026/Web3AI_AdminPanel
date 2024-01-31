export interface Web3TransactionDetail {
    id: number
    users_id: number
    coins_id: number
    operator_type: string
    operator_id: number
    type: string
    coin_network: string
    coin_symbol: string
    coin_address: string
    coin_amount: string
    usd_price: string
    from_address: string
    to_address: string
    send_transaction: any
    hash: string
    block_number: any
    receipt: any
    message: any
    status: string
    created_at: string
    updated_at: string
    user: User
    coin: Coin
}

export interface User {
    id: number
    nickname: string
    address: string
    avatar: string
    vips_id: number
}

export interface Coin {
    id: number
    cg_id: string
    symbol: string
    name: string
    icon: string
    network: string
    address: string
    market_cap_rank: number
    sparkline: string
    created_at: any
    updated_at: any
}
