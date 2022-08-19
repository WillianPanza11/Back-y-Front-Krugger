/**
 * Backend
 * Descripción
 *
 * OpenAPI spec version: 0.0.1
 * Contact: willypanza11@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { EmpleadoDto } from '../model/empleadoDto';
import { EmpleadoListAllDateDto } from '../model/empleadoListAllDateDto';
import { GenericResponseListEmpleadoListAllDateDto } from '../model/genericResponseListEmpleadoListAllDateDto';
import { GenericResponsestring } from '../model/genericResponsestring';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class EmpleadoControllerService {

    protected basePath = '//localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * datosUnEmpleado
     *
     * @param username username
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public datosUnEmpleadoUsingGET(username: string, observe?: 'body', reportProgress?: boolean): Observable<GenericResponseListEmpleadoListAllDateDto>;
    public datosUnEmpleadoUsingGET(username: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseListEmpleadoListAllDateDto>>;
    public datosUnEmpleadoUsingGET(username: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseListEmpleadoListAllDateDto>>;
    public datosUnEmpleadoUsingGET(username: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling datosUnEmpleadoUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<GenericResponseListEmpleadoListAllDateDto>('get',`${this.basePath}/empleado/datosUnEmpleado`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteEmpleado
     *
     * @param idEmpleado IdEmpleado
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteEmpleadoUsingPUT(idEmpleado: number, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public deleteEmpleadoUsingPUT(idEmpleado: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public deleteEmpleadoUsingPUT(idEmpleado: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public deleteEmpleadoUsingPUT(idEmpleado: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idEmpleado === null || idEmpleado === undefined) {
            throw new Error('Required parameter idEmpleado was null or undefined when calling deleteEmpleadoUsingPUT.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idEmpleado !== undefined && idEmpleado !== null) {
            queryParameters = queryParameters.set('IdEmpleado', <any>idEmpleado);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<GenericResponsestring>('put',`${this.basePath}/empleado/deletefamiliares`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listarEmpleadosAllDates
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listarEmpleadosAllDatesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<GenericResponseListEmpleadoListAllDateDto>;
    public listarEmpleadosAllDatesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseListEmpleadoListAllDateDto>>;
    public listarEmpleadosAllDatesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseListEmpleadoListAllDateDto>>;
    public listarEmpleadosAllDatesUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<GenericResponseListEmpleadoListAllDateDto>('get',`${this.basePath}/empleado/listarEmpleados`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveEmpleado
     *
     * @param body empleadoDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveEmpleadoUsingPOST(body: EmpleadoDto, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public saveEmpleadoUsingPOST(body: EmpleadoDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public saveEmpleadoUsingPOST(body: EmpleadoDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public saveEmpleadoUsingPOST(body: EmpleadoDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveEmpleadoUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<GenericResponsestring>('post',`${this.basePath}/empleado/save`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateDataEmpleado
     *
     * @param body empleadoDTO
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDataEmpleadoUsingPUT(body: EmpleadoListAllDateDto, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public updateDataEmpleadoUsingPUT(body: EmpleadoListAllDateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public updateDataEmpleadoUsingPUT(body: EmpleadoListAllDateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public updateDataEmpleadoUsingPUT(body: EmpleadoListAllDateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateDataEmpleadoUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<GenericResponsestring>('put',`${this.basePath}/empleado/updateDatosEmpleado`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
