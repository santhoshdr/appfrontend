/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { HttpBackend, HttpHandler } from './src/backend';
export { HttpClient } from './src/client';
export { HttpHeaders } from './src/headers';
export { HTTP_INTERCEPTORS } from './src/interceptor';
export { JsonpClientBackend, JsonpInterceptor } from './src/jsonp';
export { HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule, HttpInterceptingHandler as ɵHttpInterceptingHandler } from './src/module';
export { HttpParams, HttpUrlEncodingCodec } from './src/params';
export { HttpRequest } from './src/request';
export { HttpErrorResponse, HttpEventType, HttpHeaderResponse, HttpResponse, HttpResponseBase } from './src/response';
export { HttpXhrBackend, XhrFactory } from './src/xhr';
export { HttpXsrfTokenExtractor } from './src/xsrf';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvbW1vbi9odHRwL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGlCQUFpQixFQUFrQixNQUFNLG1CQUFtQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNqRSxPQUFPLEVBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsdUJBQXVCLElBQUksd0JBQXdCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDaEosT0FBTyxFQUFxQixVQUFVLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbEYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQTRCLGlCQUFpQixFQUFhLGFBQWEsRUFBRSxrQkFBa0IsRUFBcUIsWUFBWSxFQUFFLGdCQUFnQixFQUErQixNQUFNLGdCQUFnQixDQUFDO0FBQzNNLE9BQU8sRUFBQyxjQUFjLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0IHtIdHRwQmFja2VuZCwgSHR0cEhhbmRsZXJ9IGZyb20gJy4vc3JjL2JhY2tlbmQnO1xuZXhwb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuL3NyYy9jbGllbnQnO1xuZXhwb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnLi9zcmMvaGVhZGVycyc7XG5leHBvcnQge0hUVFBfSU5URVJDRVBUT1JTLCBIdHRwSW50ZXJjZXB0b3J9IGZyb20gJy4vc3JjL2ludGVyY2VwdG9yJztcbmV4cG9ydCB7SnNvbnBDbGllbnRCYWNrZW5kLCBKc29ucEludGVyY2VwdG9yfSBmcm9tICcuL3NyYy9qc29ucCc7XG5leHBvcnQge0h0dHBDbGllbnRKc29ucE1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudFhzcmZNb2R1bGUsIEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyIGFzIMm1SHR0cEludGVyY2VwdGluZ0hhbmRsZXJ9IGZyb20gJy4vc3JjL21vZHVsZSc7XG5leHBvcnQge0h0dHBQYXJhbWV0ZXJDb2RlYywgSHR0cFBhcmFtcywgSHR0cFVybEVuY29kaW5nQ29kZWN9IGZyb20gJy4vc3JjL3BhcmFtcyc7XG5leHBvcnQge0h0dHBSZXF1ZXN0fSBmcm9tICcuL3NyYy9yZXF1ZXN0JztcbmV4cG9ydCB7SHR0cERvd25sb2FkUHJvZ3Jlc3NFdmVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBFdmVudCwgSHR0cEV2ZW50VHlwZSwgSHR0cEhlYWRlclJlc3BvbnNlLCBIdHRwUHJvZ3Jlc3NFdmVudCwgSHR0cFJlc3BvbnNlLCBIdHRwUmVzcG9uc2VCYXNlLCBIdHRwU2VudEV2ZW50LCBIdHRwVXNlckV2ZW50fSBmcm9tICcuL3NyYy9yZXNwb25zZSc7XG5leHBvcnQge0h0dHBYaHJCYWNrZW5kLCBYaHJGYWN0b3J5fSBmcm9tICcuL3NyYy94aHInO1xuZXhwb3J0IHtIdHRwWHNyZlRva2VuRXh0cmFjdG9yfSBmcm9tICcuL3NyYy94c3JmJztcbiJdfQ==