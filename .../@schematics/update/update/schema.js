"use strict";
// THIS FILE IS AUTOMATICALLY GENERATED. TO UPDATE THIS FILE YOU NEED TO CHANGE THE
// CORRESPONDING JSON SCHEMA FILE, THEN RUN devkit-admin build (or bazel build ...).
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The preferred package manager configuration files to use for registry settings.
 */
var PackageManager;
(function (PackageManager) {
    PackageManager["Npm"] = "npm";
    PackageManager["Yarn"] = "yarn";
})(PackageManager = exports.PackageManager || (exports.PackageManager = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJkaXN0LXNjaGVtYS9wYWNrYWdlcy9zY2hlbWF0aWNzL3VwZGF0ZS91cGRhdGUvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtRkFBbUY7QUFDbkYsb0ZBQW9GOztBQStDcEY7O0dBRUc7QUFDSCxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDdEIsNkJBQVcsQ0FBQTtJQUNYLCtCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBUSElTIEZJTEUgSVMgQVVUT01BVElDQUxMWSBHRU5FUkFURUQuIFRPIFVQREFURSBUSElTIEZJTEUgWU9VIE5FRUQgVE8gQ0hBTkdFIFRIRVxuLy8gQ09SUkVTUE9ORElORyBKU09OIFNDSEVNQSBGSUxFLCBUSEVOIFJVTiBkZXZraXQtYWRtaW4gYnVpbGQgKG9yIGJhemVsIGJ1aWxkIC4uLikuXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZVxuLy8gdHNsaW50OmRpc2FibGVcblxuZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXBkYXRlIGFsbCBwYWNrYWdlcyBpbiBwYWNrYWdlLmpzb24uXG4gICAgICovXG4gICAgYWxsPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBJZiBmYWxzZSwgd2lsbCBlcnJvciBvdXQgaWYgaW5zdGFsbGVkIHBhY2thZ2VzIGFyZSBpbmNvbXBhdGlibGUgd2l0aCB0aGUgdXBkYXRlLlxuICAgICAqL1xuICAgIGZvcmNlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIGZyb20gd2hpY2ggdG8gbWlncmF0ZSBmcm9tLiBPbmx5IGF2YWlsYWJsZSB3aXRoIGEgc2luZ2xlIHBhY2thZ2UgYmVpbmcgdXBkYXRlZCxcbiAgICAgKiBhbmQgb25seSBvbiBtaWdyYXRpb24gb25seS5cbiAgICAgKi9cbiAgICBmcm9tPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE9ubHkgcGVyZm9ybSBhIG1pZ3JhdGlvbiwgZG9lcyBub3QgdXBkYXRlIHRoZSBpbnN0YWxsZWQgdmVyc2lvbi5cbiAgICAgKi9cbiAgICBtaWdyYXRlT25seT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVXNlIHRoZSBsYXJnZXN0IHZlcnNpb24sIGluY2x1ZGluZyBiZXRhIGFuZCBSQ3MuXG4gICAgICovXG4gICAgbmV4dD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIHByZWZlcnJlZCBwYWNrYWdlIG1hbmFnZXIgY29uZmlndXJhdGlvbiBmaWxlcyB0byB1c2UgZm9yIHJlZ2lzdHJ5IHNldHRpbmdzLlxuICAgICAqL1xuICAgIHBhY2thZ2VNYW5hZ2VyPzogUGFja2FnZU1hbmFnZXI7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWVzIG9mIHBhY2thZ2UocykgdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIHBhY2thZ2VzPzogc3RyaW5nW107XG4gICAgLyoqXG4gICAgICogVGhlIE5QTSByZWdpc3RyeSB0byB1c2UuXG4gICAgICovXG4gICAgcmVnaXN0cnk/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVmVyc2lvbiB1cCB0byB3aGljaCB0byBhcHBseSBtaWdyYXRpb25zLiBPbmx5IGF2YWlsYWJsZSB3aXRoIGEgc2luZ2xlIHBhY2thZ2UgYmVpbmdcbiAgICAgKiB1cGRhdGVkLCBhbmQgb25seSBvbiBtaWdyYXRpb25zIG9ubHkuIFJlcXVpcmVzIGZyb20gdG8gYmUgc3BlY2lmaWVkLiBEZWZhdWx0IHRvIHRoZVxuICAgICAqIGluc3RhbGxlZCB2ZXJzaW9uIGRldGVjdGVkLlxuICAgICAqL1xuICAgIHRvPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSBwcmVmZXJyZWQgcGFja2FnZSBtYW5hZ2VyIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gdXNlIGZvciByZWdpc3RyeSBzZXR0aW5ncy5cbiAqL1xuZXhwb3J0IGVudW0gUGFja2FnZU1hbmFnZXIge1xuICAgIE5wbSA9IFwibnBtXCIsXG4gICAgWWFybiA9IFwieWFyblwiLFxufVxuIl19