/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/transform/src/api", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy90cmFuc2Zvcm0vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29uc3RhbnRQb29sLCBFeHByZXNzaW9uLCBTdGF0ZW1lbnQsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge0RlY29yYXRvcn0gZnJvbSAnLi4vLi4vaG9zdCc7XG5pbXBvcnQge1R5cGVDaGVja0NvbnRleHR9IGZyb20gJy4uLy4uL3R5cGVjaGVjayc7XG5cblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgaW50ZXJmYWNlIGJldHdlZW4gYSBkZWNvcmF0b3IgY29tcGlsZXIgZnJvbSBAYW5ndWxhci9jb21waWxlciBhbmQgdGhlIFR5cGVzY3JpcHRcbiAqIGNvbXBpbGVyL3RyYW5zZm9ybS5cbiAqXG4gKiBUaGUgZGVjb3JhdG9yIGNvbXBpbGVycyBpbiBAYW5ndWxhci9jb21waWxlciBkbyBub3QgZGVwZW5kIG9uIFR5cGVzY3JpcHQuIFRoZSBoYW5kbGVyIGlzXG4gKiByZXNwb25zaWJsZSBmb3IgZXh0cmFjdGluZyB0aGUgaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gcGVyZm9ybSBjb21waWxhdGlvbiBmcm9tIHRoZSBkZWNvcmF0b3JzXG4gKiBhbmQgVHlwZXNjcmlwdCBzb3VyY2UsIGludm9raW5nIHRoZSBkZWNvcmF0b3IgY29tcGlsZXIsIGFuZCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNvcmF0b3JIYW5kbGVyPEEsIE0+IHtcbiAgLyoqXG4gICAqIFNjYW4gYSBzZXQgb2YgcmVmbGVjdGVkIGRlY29yYXRvcnMgYW5kIGRldGVybWluZSBpZiB0aGlzIGhhbmRsZXIgaXMgcmVzcG9uc2libGUgZm9yIGNvbXBpbGF0aW9uXG4gICAqIG9mIG9uZSBvZiB0aGVtLlxuICAgKi9cbiAgZGV0ZWN0KG5vZGU6IHRzLkRlY2xhcmF0aW9uLCBkZWNvcmF0b3JzOiBEZWNvcmF0b3JbXXxudWxsKTogTXx1bmRlZmluZWQ7XG5cblxuICAvKipcbiAgICogQXN5bmNocm9ub3VzbHkgcGVyZm9ybSBwcmUtYW5hbHlzaXMgb24gdGhlIGRlY29yYXRvci9jbGFzcyBjb21iaW5hdGlvbi5cbiAgICpcbiAgICogYHByZUFuYWx5emVgIGlzIG9wdGlvbmFsIGFuZCBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBjYWxsZWQgdGhyb3VnaCBhbGwgY29tcGlsYXRpb24gZmxvd3MuIEl0XG4gICAqIHdpbGwgb25seSBiZSBjYWxsZWQgaWYgYXN5bmNocm9uaWNpdHkgaXMgc3VwcG9ydGVkIGluIHRoZSBDb21waWxlckhvc3QuXG4gICAqL1xuICBwcmVhbmFseXplPyhub2RlOiB0cy5EZWNsYXJhdGlvbiwgbWV0YWRhdGE6IE0pOiBQcm9taXNlPHZvaWQ+fHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogUGVyZm9ybSBhbmFseXNpcyBvbiB0aGUgZGVjb3JhdG9yL2NsYXNzIGNvbWJpbmF0aW9uLCBwcm9kdWNpbmcgaW5zdHJ1Y3Rpb25zIGZvciBjb21waWxhdGlvblxuICAgKiBpZiBzdWNjZXNzZnVsLCBvciBhbiBhcnJheSBvZiBkaWFnbm9zdGljIG1lc3NhZ2VzIGlmIHRoZSBhbmFseXNpcyBmYWlscyBvciB0aGUgZGVjb3JhdG9yXG4gICAqIGlzbid0IHZhbGlkLlxuICAgKi9cbiAgYW5hbHl6ZShub2RlOiB0cy5EZWNsYXJhdGlvbiwgbWV0YWRhdGE6IE0pOiBBbmFseXNpc091dHB1dDxBPjtcblxuICB0eXBlQ2hlY2s/KGN0eDogVHlwZUNoZWNrQ29udGV4dCwgbm9kZTogdHMuRGVjbGFyYXRpb24sIG1ldGFkYXRhOiBBKTogdm9pZDtcblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBkZXNjcmlwdGlvbiBvZiB0aGUgZmllbGQgd2hpY2ggc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBjbGFzcywgaW5jbHVkaW5nIGFueVxuICAgKiBpbml0aWFsaXphdGlvbiBjb2RlIHRvIGJlIGdlbmVyYXRlZC5cbiAgICovXG4gIGNvbXBpbGUobm9kZTogdHMuRGVjbGFyYXRpb24sIGFuYWx5c2lzOiBBLCBjb25zdGFudFBvb2w6IENvbnN0YW50UG9vbCk6IENvbXBpbGVSZXN1bHRcbiAgICAgIHxDb21waWxlUmVzdWx0W107XG59XG5cbi8qKlxuICogVGhlIG91dHB1dCBvZiBhbiBhbmFseXNpcyBvcGVyYXRpb24sIGNvbnNpc3Rpbmcgb2YgcG9zc2libHkgYW4gYXJiaXRyYXJ5IGFuYWx5c2lzIG9iamVjdCAodXNlZCBhc1xuICogdGhlIGlucHV0IHRvIGNvZGUgZ2VuZXJhdGlvbikgYW5kIHBvdGVudGlhbGx5IGRpYWdub3N0aWNzIGlmIHRoZXJlIHdlcmUgZXJyb3JzIHVuY292ZXJlZCBkdXJpbmdcbiAqIGFuYWx5c2lzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuYWx5c2lzT3V0cHV0PEE+IHtcbiAgYW5hbHlzaXM/OiBBO1xuICBkaWFnbm9zdGljcz86IHRzLkRpYWdub3N0aWNbXTtcbiAgZmFjdG9yeVN5bWJvbE5hbWU/OiBzdHJpbmc7XG4gIHR5cGVDaGVjaz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBkZXNjcmlwdGlvbiBvZiB0aGUgc3RhdGljIGZpZWxkIHRvIGFkZCB0byBhIGNsYXNzLCBpbmNsdWRpbmcgYW4gaW5pdGlhbGl6YXRpb24gZXhwcmVzc2lvblxuICogYW5kIGEgdHlwZSBmb3IgdGhlIC5kLnRzIGZpbGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsZVJlc3VsdCB7XG4gIG5hbWU6IHN0cmluZztcbiAgaW5pdGlhbGl6ZXI6IEV4cHJlc3Npb247XG4gIHN0YXRlbWVudHM6IFN0YXRlbWVudFtdO1xuICB0eXBlOiBUeXBlO1xufVxuIl19