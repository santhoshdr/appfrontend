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
const exception_1 = require("../exception/exception");
const action_1 = require("../tree/action");
const Noop = function () { };
class SimpleSinkBase {
    constructor() {
        this.preCommitAction = Noop;
        this.postCommitAction = Noop;
        this.preCommit = Noop;
        this.postCommit = Noop;
    }
    _fileAlreadyExistException(path) {
        throw new exception_1.FileAlreadyExistException(path);
    }
    _fileDoesNotExistException(path) {
        throw new exception_1.FileDoesNotExistException(path);
    }
    _validateOverwriteAction(action) {
        return this._validateFileExists(action.path)
            .pipe(operators_1.map(b => { if (!b) {
            this._fileDoesNotExistException(action.path);
        } }));
    }
    _validateCreateAction(action) {
        return this._validateFileExists(action.path)
            .pipe(operators_1.map(b => { if (b) {
            this._fileAlreadyExistException(action.path);
        } }));
    }
    _validateRenameAction(action) {
        return this._validateFileExists(action.path).pipe(operators_1.map(b => { if (!b) {
            this._fileDoesNotExistException(action.path);
        } }), operators_1.mergeMap(() => this._validateFileExists(action.to)), operators_1.map(b => { if (b) {
            this._fileAlreadyExistException(action.to);
        } }));
    }
    _validateDeleteAction(action) {
        return this._validateFileExists(action.path)
            .pipe(operators_1.map(b => { if (!b) {
            this._fileDoesNotExistException(action.path);
        } }));
    }
    validateSingleAction(action) {
        switch (action.kind) {
            case 'o': return this._validateOverwriteAction(action);
            case 'c': return this._validateCreateAction(action);
            case 'r': return this._validateRenameAction(action);
            case 'd': return this._validateDeleteAction(action);
            default: throw new action_1.UnknownActionException(action);
        }
    }
    commitSingleAction(action) {
        return rxjs_1.concat(this.validateSingleAction(action), new rxjs_1.Observable(observer => {
            let committed = null;
            switch (action.kind) {
                case 'o':
                    committed = this._overwriteFile(action.path, action.content);
                    break;
                case 'c':
                    committed = this._createFile(action.path, action.content);
                    break;
                case 'r':
                    committed = this._renameFile(action.path, action.to);
                    break;
                case 'd':
                    committed = this._deleteFile(action.path);
                    break;
            }
            if (committed) {
                committed.subscribe(observer);
            }
            else {
                observer.complete();
            }
        })).pipe(operators_1.ignoreElements());
    }
    commit(tree) {
        const actions = rxjs_1.from(tree.actions);
        return rxjs_1.concat((this.preCommit() || rxjs_1.of(null)), rxjs_1.defer(() => actions).pipe(operators_1.concatMap(action => {
            const maybeAction = this.preCommitAction(action);
            if (!maybeAction) {
                return rxjs_1.of(action);
            }
            else if (action_1.isAction(maybeAction)) {
                return rxjs_1.of(maybeAction);
            }
            else {
                return maybeAction;
            }
        }), operators_1.concatMap(action => {
            return rxjs_1.concat(this.commitSingleAction(action).pipe(operators_1.ignoreElements()), rxjs_1.of(action));
        }), operators_1.concatMap(action => this.postCommitAction(action) || rxjs_1.of(null))), rxjs_1.defer(() => this._done()), rxjs_1.defer(() => this.postCommit() || rxjs_1.of(null))).pipe(operators_1.ignoreElements());
    }
}
exports.SimpleSinkBase = SimpleSinkBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luay5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvc2luay9zaW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0JBTWM7QUFDZCw4Q0FLd0I7QUFDeEIsc0RBQThGO0FBQzlGLDJDQVF3QjtBQVN4QixNQUFNLElBQUksR0FBRyxjQUFZLENBQUMsQ0FBQztBQUczQixNQUFzQixjQUFjO0lBQXBDO1FBQ0Usb0JBQWUsR0FHMkMsSUFBSSxDQUFDO1FBQy9ELHFCQUFnQixHQUFnRCxJQUFJLENBQUM7UUFDckUsY0FBUyxHQUFrQyxJQUFJLENBQUM7UUFDaEQsZUFBVSxHQUFrQyxJQUFJLENBQUM7SUFnR25ELENBQUM7SUFyRlcsMEJBQTBCLENBQUMsSUFBWTtRQUMvQyxNQUFNLElBQUkscUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNTLDBCQUEwQixDQUFDLElBQVk7UUFDL0MsTUFBTSxJQUFJLHFDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFUyx3QkFBd0IsQ0FBQyxNQUEyQjtRQUM1RCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3pDLElBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ1MscUJBQXFCLENBQUMsTUFBd0I7UUFDdEQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUN6QyxJQUFJLENBQUMsZUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxD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Q3pFLEVBQ0QsWUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUNuQyxZQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLFNBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUMvRCxDQUFDLElBQUksQ0FBQywwQkFBYyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUF2R0Qsd0NBdUdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgT2JzZXJ2YWJsZSxcbiAgY29uY2F0LFxuICBkZWZlciBhcyBkZWZlck9ic2VydmFibGUsXG4gIGZyb20gYXMgb2JzZXJ2YWJsZUZyb20sXG4gIG9mIGFzIG9ic2VydmFibGVPZixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjb25jYXRNYXAsXG4gIGlnbm9yZUVsZW1lbnRzLFxuICBtYXAsXG4gIG1lcmdlTWFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uLCBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9uL2V4Y2VwdGlvbic7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIENyZWF0ZUZpbGVBY3Rpb24sXG4gIERlbGV0ZUZpbGVBY3Rpb24sXG4gIE92ZXJ3cml0ZUZpbGVBY3Rpb24sXG4gIFJlbmFtZUZpbGVBY3Rpb24sXG4gIFVua25vd25BY3Rpb25FeGNlcHRpb24sXG4gIGlzQWN0aW9uLFxufSBmcm9tICcuLi90cmVlL2FjdGlvbic7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnLi4vdHJlZS9pbnRlcmZhY2UnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2luayB7XG4gIGNvbW1pdCh0cmVlOiBUcmVlKTogT2JzZXJ2YWJsZTx2b2lkPjtcbn1cblxuXG5jb25zdCBOb29wID0gZnVuY3Rpb24oKSB7fTtcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2ltcGxlU2lua0Jhc2UgaW1wbGVtZW50cyBTaW5rIHtcbiAgcHJlQ29tbWl0QWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IHZvaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUHJvbWlzZUxpa2U8QWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT2JzZXJ2YWJsZTxBY3Rpb24+ID0gTm9vcDtcbiAgcG9zdENvbW1pdEFjdGlvbjogKGFjdGlvbjogQWN0aW9uKSA9PiB2b2lkIHwgT2JzZXJ2YWJsZTx2b2lkPiA9IE5vb3A7XG4gIHByZUNvbW1pdDogKCkgPT4gdm9pZCB8IE9ic2VydmFibGU8dm9pZD4gPSBOb29wO1xuICBwb3N0Q29tbWl0OiAoKSA9PiB2b2lkIHwgT2JzZXJ2YWJsZTx2b2lkPiA9IE5vb3A7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IF92YWxpZGF0ZUZpbGVFeGlzdHMocDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX292ZXJ3cml0ZUZpbGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBCdWZmZXIpOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NyZWF0ZUZpbGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBCdWZmZXIpOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3JlbmFtZUZpbGUocGF0aDogc3RyaW5nLCB0bzogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9kZWxldGVGaWxlKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9kb25lKCk6IE9ic2VydmFibGU8dm9pZD47XG5cbiAgcHJvdGVjdGVkIF9maWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRocm93IG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICB9XG4gIHByb3RlY3RlZCBfZmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdmFsaWRhdGVPdmVyd3JpdGVBY3Rpb24oYWN0aW9uOiBPdmVyd3JpdGVGaWxlQWN0aW9uKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlRmlsZUV4aXN0cyhhY3Rpb24ucGF0aClcbiAgICAgIC5waXBlKG1hcChiID0+IHsgaWYgKCFiKSB7IHRoaXMuX2ZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24oYWN0aW9uLnBhdGgpOyB9IH0pKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3ZhbGlkYXRlQ3JlYXRlQWN0aW9uKGFjdGlvbjogQ3JlYXRlRmlsZUFjdGlvbik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUZpbGVFeGlzdHMoYWN0aW9uLnBhdGgpXG4gICAgICAucGlwZShtYXAoYiA9PiB7IGlmIChiKSB7IHRoaXMuX2ZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb24oYWN0aW9uLnBhdGgpOyB9IH0pKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3ZhbGlkYXRlUmVuYW1lQWN0aW9uKGFjdGlvbjogUmVuYW1lRmlsZUFjdGlvbik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUZpbGVFeGlzdHMoYWN0aW9uLnBhdGgpLnBpcGUoXG4gICAgICBtYXAoYiA9PiB7IGlmICghYikgeyB0aGlzLl9maWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKGFjdGlvbi5wYXRoKTsgfSB9KSxcbiAgICAgIG1lcmdlTWFwKCgpID0+IHRoaXMuX3ZhbGlkYXRlRmlsZUV4aXN0cyhhY3Rpb24udG8pKSxcbiAgICAgIG1hcChiID0+IHsgaWYgKGIpIHsgdGhpcy5fZmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvbihhY3Rpb24udG8pOyB9IH0pKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3ZhbGlkYXRlRGVsZXRlQWN0aW9uKGFjdGlvbjogRGVsZXRlRmlsZUFjdGlvbik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUZpbGVFeGlzdHMoYWN0aW9uLnBhdGgpXG4gICAgICAucGlwZShtYXAoYiA9PiB7IGlmICghYikgeyB0aGlzLl9maWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKGFjdGlvbi5wYXRoKTsgfSB9KSk7XG4gIH1cblxuICB2YWxpZGF0ZVNpbmdsZUFjdGlvbihhY3Rpb246IEFjdGlvbik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLmtpbmQpIHtcbiAgICAgIGNhc2UgJ28nOiByZXR1cm4gdGhpcy5fdmFsaWRhdGVPdmVyd3JpdGVBY3Rpb24oYWN0aW9uKTtcbiAgICAgIGNhc2UgJ2MnOiByZXR1cm4gdGhpcy5fdmFsaWRhdGVDcmVhdGVBY3Rpb24oYWN0aW9uKTtcbiAgICAgIGNhc2UgJ3InOiByZXR1cm4gdGhpcy5fdmFsaWRhdGVSZW5hbWVBY3Rpb24oYWN0aW9uKTtcbiAgICAgIGNhc2UgJ2QnOiByZXR1cm4gdGhpcy5fdmFsaWRhdGVEZWxldGVBY3Rpb24oYWN0aW9uKTtcbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBVbmtub3duQWN0aW9uRXhjZXB0aW9uKGFjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgY29tbWl0U2luZ2xlQWN0aW9uKGFjdGlvbjogQWN0aW9uKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIGNvbmNhdChcbiAgICAgIHRoaXMudmFsaWRhdGVTaW5nbGVBY3Rpb24oYWN0aW9uKSxcbiAgICAgIG5ldyBPYnNlcnZhYmxlPHZvaWQ+KG9ic2VydmVyID0+IHtcbiAgICAgICAgbGV0IGNvbW1pdHRlZCA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLmtpbmQpIHtcbiAgICAgICAgICBjYXNlICdvJzogY29tbWl0dGVkID0gdGhpcy5fb3ZlcndyaXRlRmlsZShhY3Rpb24ucGF0aCwgYWN0aW9uLmNvbnRlbnQpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdjJzogY29tbWl0dGVkID0gdGhpcy5fY3JlYXRlRmlsZShhY3Rpb24ucGF0aCwgYWN0aW9uLmNvbnRlbnQpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdyJzogY29tbWl0dGVkID0gdGhpcy5fcmVuYW1lRmlsZShhY3Rpb24ucGF0aCwgYWN0aW9uLnRvKTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZCc6IGNvbW1pdHRlZCA9IHRoaXMuX2RlbGV0ZUZpbGUoYWN0aW9uLnBhdGgpOyBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21taXR0ZWQpIHtcbiAgICAgICAgICBjb21taXR0ZWQuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApLnBpcGUoaWdub3JlRWxlbWVudHMoKSk7XG4gIH1cblxuICBjb21taXQodHJlZTogVHJlZSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IGFjdGlvbnMgPSBvYnNlcnZhYmxlRnJvbSh0cmVlLmFjdGlvbnMpO1xuXG4gICAgcmV0dXJuIGNvbmNhdChcbiAgICAgICh0aGlzLnByZUNvbW1pdCgpIHx8IG9ic2VydmFibGVPZihudWxsKSksXG4gICAgICBkZWZlck9ic2VydmFibGUoKCkgPT4gYWN0aW9ucykucGlwZShcbiAgICAgICAgY29uY2F0TWFwKGFjdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3QgbWF5YmVBY3Rpb24gPSB0aGlzLnByZUNvbW1pdEFjdGlvbihhY3Rpb24pO1xuICAgICAgICAgIGlmICghbWF5YmVBY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoYWN0aW9uKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQWN0aW9uKG1heWJlQWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihtYXliZUFjdGlvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtYXliZUFjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBjb25jYXRNYXAoYWN0aW9uID0+IHtcbiAgICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgICAgdGhpcy5jb21taXRTaW5nbGVBY3Rpb24oYWN0aW9uKS5waXBlKGlnbm9yZUVsZW1lbnRzKCkpLFxuICAgICAgICAgICAgb2JzZXJ2YWJsZU9mKGFjdGlvbiksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNvbmNhdE1hcChhY3Rpb24gPT4gdGhpcy5wb3N0Q29tbWl0QWN0aW9uKGFjdGlvbikgfHwgb2JzZXJ2YWJsZU9mKG51bGwpKSxcbiAgICAgICksXG4gICAgICBkZWZlck9ic2VydmFibGUoKCkgPT4gdGhpcy5fZG9uZSgpKSxcbiAgICAgIGRlZmVyT2JzZXJ2YWJsZSgoKSA9PiB0aGlzLnBvc3RDb21taXQoKSB8fCBvYnNlcnZhYmxlT2YobnVsbCkpLFxuICAgICkucGlwZShpZ25vcmVFbGVtZW50cygpKTtcbiAgfVxufVxuIl19