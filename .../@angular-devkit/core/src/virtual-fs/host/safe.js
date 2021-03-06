"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * A Host that filters out errors. The only exception is `read()` which will still error out if
 * the delegate returned an error (e.g. NodeJS will error out if the file doesn't exist).
 */
class SafeReadonlyHost {
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    get capabilities() {
        return this._delegate.capabilities;
    }
    read(path) {
        return this._delegate.read(path);
    }
    list(path) {
        return this._delegate.list(path).pipe(operators_1.catchError(() => rxjs_1.of([])));
    }
    exists(path) {
        return this._delegate.exists(path);
    }
    isDirectory(path) {
        return this._delegate.isDirectory(path).pipe(operators_1.catchError(() => rxjs_1.of(false)));
    }
    isFile(path) {
        return this._delegate.isFile(path).pipe(operators_1.catchError(() => rxjs_1.of(false)));
    }
    // Some hosts may not support stats.
    stat(path) {
        const maybeStat = this._delegate.stat(path);
        return maybeStat && maybeStat.pipe(operators_1.catchError(() => rxjs_1.of(null)));
    }
}
exports.SafeReadonlyHost = SafeReadonlyHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdmlydHVhbC1mcy9ob3N0L3NhZmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQkFBc0M7QUFDdEMsOENBQTRDO0FBSTVDOzs7R0FHRztBQUNILE1BQWEsZ0JBQWdCO0lBQzNCLFlBQW9CLFNBQStCO1FBQS9CLGNBQVMsR0FBVCxTQUFTLENBQXNCO0lBQUcsQ0FBQztJQUV2RCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ25DLHNCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxXQUFXLENBQUMsSUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDMUMsc0JBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDNUIsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNyQyxzQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUM1QixDQUFDO0lBQ0osQ0FBQztJQUVELG9DQUFvQztJQUNwQyxJQUFJLENBQUMsSUFBVTtRQUNiLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQ2hDLHNCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzNCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUF2Q0QsNENBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQYXRoLCBQYXRoRnJhZ21lbnQgfSBmcm9tICcuLi9wYXRoJztcbmltcG9ydCB7IEZpbGVCdWZmZXIsIEhvc3RDYXBhYmlsaXRpZXMsIFJlYWRvbmx5SG9zdCwgU3RhdHMgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbi8qKlxuICogQSBIb3N0IHRoYXQgZmlsdGVycyBvdXQgZXJyb3JzLiBUaGUgb25seSBleGNlcHRpb24gaXMgYHJlYWQoKWAgd2hpY2ggd2lsbCBzdGlsbCBlcnJvciBvdXQgaWZcbiAqIHRoZSBkZWxlZ2F0ZSByZXR1cm5lZCBhbiBlcnJvciAoZS5nLiBOb2RlSlMgd2lsbCBlcnJvciBvdXQgaWYgdGhlIGZpbGUgZG9lc24ndCBleGlzdCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBTYWZlUmVhZG9ubHlIb3N0PFN0YXRzVCBleHRlbmRzIG9iamVjdCA9IHt9PiBpbXBsZW1lbnRzIFJlYWRvbmx5SG9zdDxTdGF0c1Q+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGVsZWdhdGU6IFJlYWRvbmx5SG9zdDxTdGF0c1Q+KSB7fVxuXG4gIGdldCBjYXBhYmlsaXRpZXMoKTogSG9zdENhcGFiaWxpdGllcyB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmNhcGFiaWxpdGllcztcbiAgfVxuXG4gIHJlYWQocGF0aDogUGF0aCk6IE9ic2VydmFibGU8RmlsZUJ1ZmZlcj4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5yZWFkKHBhdGgpO1xuICB9XG5cbiAgbGlzdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxQYXRoRnJhZ21lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5saXN0KHBhdGgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKCgpID0+IG9mKFtdKSksXG4gICAgKTtcbiAgfVxuXG4gIGV4aXN0cyhwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmV4aXN0cyhwYXRoKTtcbiAgfVxuICBpc0RpcmVjdG9yeShwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmlzRGlyZWN0b3J5KHBhdGgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKCgpID0+IG9mKGZhbHNlKSksXG4gICAgKTtcbiAgfVxuICBpc0ZpbGUocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5pc0ZpbGUocGF0aCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoZmFsc2UpKSxcbiAgICApO1xuICB9XG5cbiAgLy8gU29tZSBob3N0cyBtYXkgbm90IHN1cHBvcnQgc3RhdHMuXG4gIHN0YXQocGF0aDogUGF0aCk6IE9ic2VydmFibGU8U3RhdHM8U3RhdHNUPiB8IG51bGw+IHwgbnVsbCB7XG4gICAgY29uc3QgbWF5YmVTdGF0ID0gdGhpcy5fZGVsZWdhdGUuc3RhdChwYXRoKTtcblxuICAgIHJldHVybiBtYXliZVN0YXQgJiYgbWF5YmVTdGF0LnBpcGUoXG4gICAgICBjYXRjaEVycm9yKCgpID0+IG9mKG51bGwpKSxcbiAgICApO1xuICB9XG59XG4iXX0=