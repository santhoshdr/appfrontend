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
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const ts = require("typescript");
const ast_utils_1 = require("../utility/ast-utils");
function findBootstrapModuleCall(host, mainPath) {
    const mainBuffer = host.read(mainPath);
    if (!mainBuffer) {
        throw new schematics_1.SchematicsException(`Main file (${mainPath}) not found`);
    }
    const mainText = mainBuffer.toString('utf-8');
    const source = ts.createSourceFile(mainPath, mainText, ts.ScriptTarget.Latest, true);
    const allNodes = ast_utils_1.getSourceNodes(source);
    let bootstrapCall = null;
    for (const node of allNodes) {
        let bootstrapCallNode = null;
        bootstrapCallNode = ast_utils_1.findNode(node, ts.SyntaxKind.Identifier, 'bootstrapModule');
        // Walk up the parent until CallExpression is found.
        while (bootstrapCallNode && bootstrapCallNode.parent
            && bootstrapCallNode.parent.kind !== ts.SyntaxKind.CallExpression) {
            bootstrapCallNode = bootstrapCallNode.parent;
        }
        if (bootstrapCallNode !== null &&
            bootstrapCallNode.parent !== undefined &&
            bootstrapCallNode.parent.kind === ts.SyntaxKind.CallExpression) {
            bootstrapCall = bootstrapCallNode.parent;
            break;
        }
    }
    return bootstrapCall;
}
exports.findBootstrapModuleCall = findBootstrapModuleCall;
function findBootstrapModulePath(host, mainPath) {
    const bootstrapCall = findBootstrapModuleCall(host, mainPath);
    if (!bootstrapCall) {
        throw new schematics_1.SchematicsException('Bootstrap call not found');
    }
    const bootstrapModule = bootstrapCall.arguments[0];
    const mainBuffer = host.read(mainPath);
    if (!mainBuffer) {
        throw new schematics_1.SchematicsException(`Client app main file (${mainPath}) not found`);
    }
    const mainText = mainBuffer.toString('utf-8');
    const source = ts.createSourceFile(mainPath, mainText, ts.ScriptTarget.Latest, true);
    const allNodes = ast_utils_1.getSourceNodes(source);
    const bootstrapModuleRelativePath = allNodes
        .filter(node => node.kind === ts.SyntaxKind.ImportDeclaration)
        .filter(imp => {
        return ast_utils_1.findNode(imp, ts.SyntaxKind.Identifier, bootstrapModule.getText());
    })
        .map((imp) => {
        const modulePathStringLiteral = imp.moduleSpecifier;
        return modulePathStringLiteral.text;
    })[0];
    return bootstrapModuleRelativePath;
}
exports.findBootstrapModulePath = findBootstrapModulePath;
function getAppModulePath(host, mainPath) {
    const moduleRelativePath = findBootstrapModulePath(host, mainPath);
    const mainDir = path_1.dirname(mainPath);
    const modulePath = core_1.normalize(`/${mainDir}/${moduleRelativePath}.ts`);
    return modulePath;
}
exports.getAppModulePath = getAppModulePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9zY2hlbWF0aWNzL2FuZ3VsYXIvdXRpbGl0eS9uZy1hc3QtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBaUQ7QUFDakQsMkRBQXVFO0FBQ3ZFLCtCQUErQjtBQUMvQixpQ0FBaUM7QUFDakMsb0RBQWdFO0FBRWhFLFNBQWdCLHVCQUF1QixDQUFDLElBQVUsRUFBRSxRQUFnQjtJQUNsRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixNQUFNLElBQUksZ0NBQW1CLENBQUMsY0FBYyxRQUFRLGFBQWEsQ0FBQyxDQUFDO0tBQ3BFO0lBQ0QsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVyRixNQUFNLFFBQVEsR0FBRywwQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhDLElBQUksYUFBYSxHQUE2QixJQUFJLENBQUM7SUFFbkQsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUU7UUFFM0IsSUFBSSxpQkFBaUIsR0FBbUIsSUFBSSxDQUFDO1FBQzdDLGlCQUFpQixHQUFHLG9CQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFaEYsb0RBQW9EO1FBQ3BELE9BQU8saUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTTtlQUMvQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO1lBRW5FLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztTQUM5QztRQUVELElBQUksaUJBQWlCLEtBQUssSUFBSTtZQUM1QixpQkFBaUIsQ0FBQyxNQUFNLEtBQUssU0FBUztZQUN0QyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO1lBQ2hFLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxNQUEyQixDQUFDO1lBQzlELE1BQU07U0FDUDtLQUNGO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQWpDRCwwREFpQ0M7QUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxJQUFVLEVBQUUsUUFBZ0I7SUFDbEUsTUFBTSxhQUFhLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDM0Q7SUFFRCxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyx5QkFBeUIsUUFBUSxhQUFhLENBQUMsQ0FBQztLQUMvRTtJQUNELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckYsTUFBTSxRQUFRLEdBQUcsMEJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxNQUFNLDJCQUEyQixHQUFHLFFBQVE7U0FDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDO1NBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNaLE9BQU8sb0JBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQyxDQUFDO1NBQ0QsR0FBRyxDQUFDLENBQUMsR0FBeUIsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLGVBQW1DLENBQUM7UUFFeEUsT0FBTyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFUixPQUFPLDJCQUEyQixDQUFDO0FBQ3JDLENBQUM7QUEzQkQsMERBMkJDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBVSxFQUFFLFFBQWdCO0lBQzNELE1BQU0sa0JBQWtCLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sT0FBTyxHQUFHLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLElBQUksT0FBTyxJQUFJLGtCQUFrQixLQUFLLENBQUMsQ0FBQztJQUVyRSxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBTkQsNENBTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBTY2hlbWF0aWNzRXhjZXB0aW9uLCBUcmVlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgZGlybmFtZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBmaW5kTm9kZSwgZ2V0U291cmNlTm9kZXMgfSBmcm9tICcuLi91dGlsaXR5L2FzdC11dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQm9vdHN0cmFwTW9kdWxlQ2FsbChob3N0OiBUcmVlLCBtYWluUGF0aDogc3RyaW5nKTogdHMuQ2FsbEV4cHJlc3Npb24gfCBudWxsIHtcbiAgY29uc3QgbWFpbkJ1ZmZlciA9IGhvc3QucmVhZChtYWluUGF0aCk7XG4gIGlmICghbWFpbkJ1ZmZlcikge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBNYWluIGZpbGUgKCR7bWFpblBhdGh9KSBub3QgZm91bmRgKTtcbiAgfVxuICBjb25zdCBtYWluVGV4dCA9IG1haW5CdWZmZXIudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUobWFpblBhdGgsIG1haW5UZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuICBjb25zdCBhbGxOb2RlcyA9IGdldFNvdXJjZU5vZGVzKHNvdXJjZSk7XG5cbiAgbGV0IGJvb3RzdHJhcENhbGw6IHRzLkNhbGxFeHByZXNzaW9uIHwgbnVsbCA9IG51bGw7XG5cbiAgZm9yIChjb25zdCBub2RlIG9mIGFsbE5vZGVzKSB7XG5cbiAgICBsZXQgYm9vdHN0cmFwQ2FsbE5vZGU6IHRzLk5vZGUgfCBudWxsID0gbnVsbDtcbiAgICBib290c3RyYXBDYWxsTm9kZSA9IGZpbmROb2RlKG5vZGUsIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllciwgJ2Jvb3RzdHJhcE1vZHVsZScpO1xuXG4gICAgLy8gV2FsayB1cCB0aGUgcGFyZW50IHVudGlsIENhbGxFeHByZXNzaW9uIGlzIGZvdW5kLlxuICAgIHdoaWxlIChib290c3RyYXBDYWxsTm9kZSAmJiBib290c3RyYXBDYWxsTm9kZS5wYXJlbnRcbiAgICAgICYmIGJvb3RzdHJhcENhbGxOb2RlLnBhcmVudC5raW5kICE9PSB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uKSB7XG5cbiAgICAgIGJvb3RzdHJhcENhbGxOb2RlID0gYm9vdHN0cmFwQ2FsbE5vZGUucGFyZW50O1xuICAgIH1cblxuICAgIGlmIChib290c3RyYXBDYWxsTm9kZSAhPT0gbnVsbCAmJlxuICAgICAgYm9vdHN0cmFwQ2FsbE5vZGUucGFyZW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIGJvb3RzdHJhcENhbGxOb2RlLnBhcmVudC5raW5kID09PSB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uKSB7XG4gICAgICBib290c3RyYXBDYWxsID0gYm9vdHN0cmFwQ2FsbE5vZGUucGFyZW50IGFzIHRzLkNhbGxFeHByZXNzaW9uO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJvb3RzdHJhcENhbGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQm9vdHN0cmFwTW9kdWxlUGF0aChob3N0OiBUcmVlLCBtYWluUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgYm9vdHN0cmFwQ2FsbCA9IGZpbmRCb290c3RyYXBNb2R1bGVDYWxsKGhvc3QsIG1haW5QYXRoKTtcbiAgaWYgKCFib290c3RyYXBDYWxsKSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0Jvb3RzdHJhcCBjYWxsIG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgY29uc3QgYm9vdHN0cmFwTW9kdWxlID0gYm9vdHN0cmFwQ2FsbC5hcmd1bWVudHNbMF07XG5cbiAgY29uc3QgbWFpbkJ1ZmZlciA9IGhvc3QucmVhZChtYWluUGF0aCk7XG4gIGlmICghbWFpbkJ1ZmZlcikge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBDbGllbnQgYXBwIG1haW4gZmlsZSAoJHttYWluUGF0aH0pIG5vdCBmb3VuZGApO1xuICB9XG4gIGNvbnN0IG1haW5UZXh0ID0gbWFpbkJ1ZmZlci50b1N0cmluZygndXRmLTgnKTtcbiAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtYWluUGF0aCwgbWFpblRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuICBjb25zdCBhbGxOb2RlcyA9IGdldFNvdXJjZU5vZGVzKHNvdXJjZSk7XG4gIGNvbnN0IGJvb3RzdHJhcE1vZHVsZVJlbGF0aXZlUGF0aCA9IGFsbE5vZGVzXG4gICAgLmZpbHRlcihub2RlID0+IG5vZGUua2luZCA9PT0gdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbilcbiAgICAuZmlsdGVyKGltcCA9PiB7XG4gICAgICByZXR1cm4gZmluZE5vZGUoaW1wLCB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIsIGJvb3RzdHJhcE1vZHVsZS5nZXRUZXh0KCkpO1xuICAgIH0pXG4gICAgLm1hcCgoaW1wOiB0cy5JbXBvcnREZWNsYXJhdGlvbikgPT4ge1xuICAgICAgY29uc3QgbW9kdWxlUGF0aFN0cmluZ0xpdGVyYWwgPSBpbXAubW9kdWxlU3BlY2lmaWVyIGFzIHRzLlN0cmluZ0xpdGVyYWw7XG5cbiAgICAgIHJldHVybiBtb2R1bGVQYXRoU3RyaW5nTGl0ZXJhbC50ZXh0O1xuICAgIH0pWzBdO1xuXG4gIHJldHVybiBib290c3RyYXBNb2R1bGVSZWxhdGl2ZVBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBNb2R1bGVQYXRoKGhvc3Q6IFRyZWUsIG1haW5QYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtb2R1bGVSZWxhdGl2ZVBhdGggPSBmaW5kQm9vdHN0cmFwTW9kdWxlUGF0aChob3N0LCBtYWluUGF0aCk7XG4gIGNvbnN0IG1haW5EaXIgPSBkaXJuYW1lKG1haW5QYXRoKTtcbiAgY29uc3QgbW9kdWxlUGF0aCA9IG5vcm1hbGl6ZShgLyR7bWFpbkRpcn0vJHttb2R1bGVSZWxhdGl2ZVBhdGh9LnRzYCk7XG5cbiAgcmV0dXJuIG1vZHVsZVBhdGg7XG59XG4iXX0=