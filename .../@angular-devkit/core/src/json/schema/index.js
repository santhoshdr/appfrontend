"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./pointer"));
__export(require("./registry"));
__export(require("./visitor"));
__export(require("./utility"));
const transforms = require("./transforms");
exports.transforms = transforms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL2pzb24vc2NoZW1hL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsK0JBQTBCO0FBQzFCLGdDQUEyQjtBQUMzQiwrQkFBMEI7QUFDMUIsK0JBQTBCO0FBRTFCLDJDQUEyQztBQUVsQyxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vcG9pbnRlcic7XG5leHBvcnQgKiBmcm9tICcuL3JlZ2lzdHJ5JztcbmV4cG9ydCAqIGZyb20gJy4vdmlzaXRvcic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxpdHknO1xuXG5pbXBvcnQgKiBhcyB0cmFuc2Zvcm1zIGZyb20gJy4vdHJhbnNmb3Jtcyc7XG5cbmV4cG9ydCB7IHRyYW5zZm9ybXMgfTtcbiJdfQ==