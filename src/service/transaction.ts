import { AxiosResponse, request } from 'umi';
import { Web3TransactionDetail } from '@/pages/assets/pendings/types';

interface IShowTransParams {
  id: number;
}

export const showTransactionById = (
  params: IShowTransParams
): Promise<AxiosResponse<Web3TransactionDetail>> =>
  request('web3_transactions/show', {
    data: { web3_transactions_id: params.id },
  });
