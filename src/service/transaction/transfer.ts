import * as factory from '@motionpicture/pecorino-factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    expires: Date;
    recipient: {
        typeOf: string;
        id: string;
        name: string;
        url: string;
    };
    price: number;
    notes: string;
    fromAccountId: string;
    toAccountId: string;
}

/**
 * 転送取引サービス
 */
export class TransferTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start(params: IStartParams): Promise<factory.transaction.transfer.ITransaction> {
        return this.fetch({
            uri: '/transactions/transfer/start',
            method: 'POST',
            body: {
                expires: params.expires,
                recipient: {
                    typeOf: params.recipient.typeOf,
                    id: params.recipient.id,
                    name: params.recipient.name,
                    url: params.recipient.url
                },
                price: params.price,
                notes: params.notes,
                fromAccountId: params.fromAccountId,
                toAccountId: params.toAccountId
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/transfer/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/transfer/${params.transactionId}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
