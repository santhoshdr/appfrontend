"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics"); // tslint:disable-line:no-implicit-dependencies
const node_1 = require("../../tasks/node");
const node_module_engine_host_1 = require("../node-module-engine-host");
const schema_option_transform_1 = require("../schema-option-transform");
/**
 * A workflow specifically for Node tools.
 */
class NodeWorkflow extends schematics_1.workflow.BaseWorkflow {
    constructor(host, options) {
        const engineHost = new node_module_engine_host_1.NodeModulesEngineHost();
        super({
            host: host,
            engineHost: engineHost,
            force: options.force,
            dryRun: options.dryRun,
        });
        engineHost.registerOptionsTransform(schema_option_transform_1.validateOptionsWithSchema(this._registry));
        engineHost.registerTaskExecutor(node_1.BuiltinTaskExecutor.NodePackage, {
            allowPackageManagerOverride: true,
            packageManager: options.packageManager,
            rootDirectory: options.root && core_1.getSystemPath(options.root),
        });
        engineHost.registerTaskExecutor(node_1.BuiltinTaskExecutor.RepositoryInitializer, {
            rootDirectory: options.root && core_1.getSystemPath(options.root),
        });
        engineHost.registerTaskExecutor(node_1.BuiltinTaskExecutor.RunSchematic);
        engineHost.registerTaskExecutor(node_1.BuiltinTaskExecutor.TslintFix);
        this._context = [];
    }
}
exports.NodeWorkflow = NodeWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS13b3JrZmxvdy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy90b29scy93b3JrZmxvdy9ub2RlLXdvcmtmbG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQXNFO0FBQ3RFLDJEQUVvQyxDQUFFLCtDQUErQztBQUNyRiwyQ0FBdUQ7QUFDdkQsd0VBQW1FO0FBQ25FLHdFQUF1RTtBQUV2RTs7R0FFRztBQUNILE1BQWEsWUFBYSxTQUFRLHFCQUFRLENBQUMsWUFBWTtJQUNyRCxZQUNFLElBQW9CLEVBQ3BCLE9BS0M7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLCtDQUFxQixFQUFFLENBQUM7UUFDL0MsS0FBSyxDQUFDO1lBQ0osSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsVUFBVTtZQUV0QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3ZCLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxtREFBeUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUUvRSxVQUFVLENBQUMsb0JBQW9CLENBQzdCLDBCQUFtQixDQUFDLFdBQVcsRUFDL0I7WUFDRSwyQkFBMkIsRUFBRSxJQUFJO1lBQ2pDLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYztZQUN0QyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxvQkFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDM0QsQ0FDRixDQUFDO1FBQ0YsVUFBVSxDQUFDLG9CQUFvQixDQUM3QiwwQkFBbUIsQ0FBQyxxQkFBcUIsRUFDekM7WUFDRSxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxvQkFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDM0QsQ0FDRixDQUFDO1FBQ0YsVUFBVSxDQUFDLG9CQUFvQixDQUFDLDBCQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQywwQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUF4Q0Qsb0NBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgUGF0aCwgZ2V0U3lzdGVtUGF0aCwgdmlydHVhbEZzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHtcbiAgd29ya2Zsb3csXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJzsgIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBCdWlsdGluVGFza0V4ZWN1dG9yIH0gZnJvbSAnLi4vLi4vdGFza3Mvbm9kZSc7XG5pbXBvcnQgeyBOb2RlTW9kdWxlc0VuZ2luZUhvc3QgfSBmcm9tICcuLi9ub2RlLW1vZHVsZS1lbmdpbmUtaG9zdCc7XG5pbXBvcnQgeyB2YWxpZGF0ZU9wdGlvbnNXaXRoU2NoZW1hIH0gZnJvbSAnLi4vc2NoZW1hLW9wdGlvbi10cmFuc2Zvcm0nO1xuXG4vKipcbiAqIEEgd29ya2Zsb3cgc3BlY2lmaWNhbGx5IGZvciBOb2RlIHRvb2xzLlxuICovXG5leHBvcnQgY2xhc3MgTm9kZVdvcmtmbG93IGV4dGVuZHMgd29ya2Zsb3cuQmFzZVdvcmtmbG93IHtcbiAgY29uc3RydWN0b3IoXG4gICAgaG9zdDogdmlydHVhbEZzLkhvc3QsXG4gICAgb3B0aW9uczoge1xuICAgICAgZm9yY2U/OiBib29sZWFuO1xuICAgICAgZHJ5UnVuPzogYm9vbGVhbjtcbiAgICAgIHJvb3Q/OiBQYXRoLFxuICAgICAgcGFja2FnZU1hbmFnZXI/OiBzdHJpbmc7XG4gICAgfSxcbiAgKSB7XG4gICAgY29uc3QgZW5naW5lSG9zdCA9IG5ldyBOb2RlTW9kdWxlc0VuZ2luZUhvc3QoKTtcbiAgICBzdXBlcih7XG4gICAgICBob3N0OiBob3N0LFxuICAgICAgZW5naW5lSG9zdDogZW5naW5lSG9zdCxcblxuICAgICAgZm9yY2U6IG9wdGlvbnMuZm9yY2UsXG4gICAgICBkcnlSdW46IG9wdGlvbnMuZHJ5UnVuLFxuICAgIH0pO1xuXG4gICAgZW5naW5lSG9zdC5yZWdpc3Rlck9wdGlvbnNUcmFuc2Zvcm0odmFsaWRhdGVPcHRpb25zV2l0aFNjaGVtYSh0aGlzLl9yZWdpc3RyeSkpO1xuXG4gICAgZW5naW5lSG9zdC5yZWdpc3RlclRhc2tFeGVjdXRvcihcbiAgICAgIEJ1aWx0aW5UYXNrRXhlY3V0b3IuTm9kZVBhY2thZ2UsXG4gICAgICB7XG4gICAgICAgIGFsbG93UGFja2FnZU1hbmFnZXJPdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgcGFja2FnZU1hbmFnZXI6IG9wdGlvbnMucGFja2FnZU1hbmFnZXIsXG4gICAgICAgIHJvb3REaXJlY3Rvcnk6IG9wdGlvbnMucm9vdCAmJiBnZXRTeXN0ZW1QYXRoKG9wdGlvbnMucm9vdCksXG4gICAgICB9LFxuICAgICk7XG4gICAgZW5naW5lSG9zdC5yZWdpc3RlclRhc2tFeGVjdXRvcihcbiAgICAgIEJ1aWx0aW5UYXNrRXhlY3V0b3IuUmVwb3NpdG9yeUluaXRpYWxpemVyLFxuICAgICAge1xuICAgICAgICByb290RGlyZWN0b3J5OiBvcHRpb25zLnJvb3QgJiYgZ2V0U3lzdGVtUGF0aChvcHRpb25zLnJvb3QpLFxuICAgICAgfSxcbiAgICApO1xuICAgIGVuZ2luZUhvc3QucmVnaXN0ZXJUYXNrRXhlY3V0b3IoQnVpbHRpblRhc2tFeGVjdXRvci5SdW5TY2hlbWF0aWMpO1xuICAgIGVuZ2luZUhvc3QucmVnaXN0ZXJUYXNrRXhlY3V0b3IoQnVpbHRpblRhc2tFeGVjdXRvci5Uc2xpbnRGaXgpO1xuXG4gICAgdGhpcy5fY29udGV4dCA9IFtdO1xuICB9XG59XG4iXX0=