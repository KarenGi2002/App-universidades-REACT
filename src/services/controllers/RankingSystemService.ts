/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ranking_system } from '../models/ranking_system';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RankingSystemService {

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiRankingSystem(
requestBody?: ranking_system,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/rankingSystem',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiRankingSystem(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/rankingSystem',
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putApiRankingSystem(
id: string,
requestBody?: ranking_system,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/rankingSystem/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiRankingSystem(
id: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/rankingSystem/{id}',
            path: {
                'id': id,
            },
        });
    }

}
