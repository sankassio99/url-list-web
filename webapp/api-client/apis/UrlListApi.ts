/* tslint:disable */
/* eslint-disable */
/**
 * URL List API
 * API for managing URL lists         Schema: <a href=\"http://localhost:3001/api-yaml\" target=\"_blank\">http://localhost:3001/api-yaml</a>       
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateUrlListDto,
  UrlListDto,
} from '../models/index';
import {
    CreateUrlListDtoFromJSON,
    CreateUrlListDtoToJSON,
    UrlListDtoFromJSON,
    UrlListDtoToJSON,
} from '../models/index';

export interface UrlListControllerCreateRequest {
    createUrlListDto: CreateUrlListDto;
}

export interface UrlListControllerFindBySlugRequest {
    slug: string;
}

export interface UrlListControllerFindOneRequest {
    id: string;
}

export interface UrlListControllerRemoveRequest {
    id: string;
}

export interface UrlListControllerUpdateRequest {
    id: string;
    body: object;
}

/**
 * UrlListApi - interface
 * 
 * @export
 * @interface UrlListApiInterface
 */
export interface UrlListApiInterface {
    /**
     * 
     * @param {CreateUrlListDto} createUrlListDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UrlListApiInterface
     */
    urlListControllerCreateRaw(requestParameters: UrlListControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UrlListDto>>;

    /**
     */
    urlListControllerCreate(requestParameters: UrlListControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UrlListDto>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UrlListApiInterface
     */
    urlListControllerFindAllRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<UrlListDto>>>;

    /**
     */
    urlListControllerFindAll(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<UrlListDto>>;

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UrlListApiInterface
     */
    urlListControllerFindBySlugRaw(requestParameters: UrlListControllerFindBySlugRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UrlListDto>>;

    /**
     */
    urlListControllerFindBySlug(requestParameters: UrlListControllerFindBySlugRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UrlListDto>;

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UrlListApiInterface
     */
    urlListControllerFindOneRaw(requestParameters: UrlListControllerFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UrlListDto>>;

    /**
     */
    urlListControllerFindOne(requestParameters: UrlListControllerFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UrlListDto>;

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UrlListApiInterface
     */
    urlListControllerRemoveRaw(requestParameters: UrlListControllerRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     */
    urlListControllerRemove(requestParameters: UrlListControllerRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @param {string} id 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UrlListApiInterface
     */
    urlListControllerUpdateRaw(requestParameters: UrlListControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     */
    urlListControllerUpdate(requestParameters: UrlListControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

}

/**
 * 
 */
export class UrlListApi extends runtime.BaseAPI implements UrlListApiInterface {

    /**
     */
    async urlListControllerCreateRaw(requestParameters: UrlListControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UrlListDto>> {
        if (requestParameters['createUrlListDto'] == null) {
            throw new runtime.RequiredError(
                'createUrlListDto',
                'Required parameter "createUrlListDto" was null or undefined when calling urlListControllerCreate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/url-lists`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUrlListDtoToJSON(requestParameters['createUrlListDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UrlListDtoFromJSON(jsonValue));
    }

    /**
     */
    async urlListControllerCreate(requestParameters: UrlListControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UrlListDto> {
        const response = await this.urlListControllerCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async urlListControllerFindAllRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<UrlListDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/url-lists`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UrlListDtoFromJSON));
    }

    /**
     */
    async urlListControllerFindAll(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<UrlListDto>> {
        const response = await this.urlListControllerFindAllRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async urlListControllerFindBySlugRaw(requestParameters: UrlListControllerFindBySlugRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UrlListDto>> {
        if (requestParameters['slug'] == null) {
            throw new runtime.RequiredError(
                'slug',
                'Required parameter "slug" was null or undefined when calling urlListControllerFindBySlug().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/url-lists/slug/{slug}`.replace(`{${"slug"}}`, encodeURIComponent(String(requestParameters['slug']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UrlListDtoFromJSON(jsonValue));
    }

    /**
     */
    async urlListControllerFindBySlug(requestParameters: UrlListControllerFindBySlugRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UrlListDto> {
        const response = await this.urlListControllerFindBySlugRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async urlListControllerFindOneRaw(requestParameters: UrlListControllerFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UrlListDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling urlListControllerFindOne().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/url-lists/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UrlListDtoFromJSON(jsonValue));
    }

    /**
     */
    async urlListControllerFindOne(requestParameters: UrlListControllerFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UrlListDto> {
        const response = await this.urlListControllerFindOneRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async urlListControllerRemoveRaw(requestParameters: UrlListControllerRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling urlListControllerRemove().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/url-lists/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async urlListControllerRemove(requestParameters: UrlListControllerRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.urlListControllerRemoveRaw(requestParameters, initOverrides);
    }

    /**
     */
    async urlListControllerUpdateRaw(requestParameters: UrlListControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling urlListControllerUpdate().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling urlListControllerUpdate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/url-lists/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'] as any,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async urlListControllerUpdate(requestParameters: UrlListControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.urlListControllerUpdateRaw(requestParameters, initOverrides);
    }

}
