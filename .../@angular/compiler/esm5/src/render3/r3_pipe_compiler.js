/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from '../compile_metadata';
import * as o from '../output/output_ast';
import { error } from '../util';
import { compileFactoryFunction, dependenciesFromGlobalMetadata } from './r3_factory';
import { Identifiers as R3 } from './r3_identifiers';
export function compilePipeFromMetadata(metadata) {
    var definitionMapValues = [];
    // e.g. `name: 'myPipe'`
    definitionMapValues.push({ key: 'name', value: o.literal(metadata.pipeName), quoted: false });
    // e.g. `type: MyPipe`
    definitionMapValues.push({ key: 'type', value: metadata.type, quoted: false });
    var templateFactory = compileFactoryFunction({
        name: metadata.name,
        type: metadata.type,
        deps: metadata.deps,
        injectFn: R3.directiveInject,
        extraStatementFn: null,
    });
    definitionMapValues.push({ key: 'factory', value: templateFactory.factory, quoted: false });
    // e.g. `pure: true`
    definitionMapValues.push({ key: 'pure', value: o.literal(metadata.pure), quoted: false });
    var expression = o.importExpr(R3.definePipe).callFn([o.literalMap(definitionMapValues)]);
    var type = new o.ExpressionType(o.importExpr(R3.PipeDefWithMeta, [
        new o.ExpressionType(metadata.type),
        new o.ExpressionType(new o.LiteralExpr(metadata.pipeName)),
    ]));
    return { expression: expression, type: type, statements: templateFactory.statements };
}
/**
 * Write a pipe definition to the output context.
 */
export function compilePipeFromRender2(outputCtx, pipe, reflector) {
    var definitionMapValues = [];
    var name = identifierName(pipe.type);
    if (!name) {
        return error("Cannot resolve the name of " + pipe.type);
    }
    var metadata = {
        name: name,
        pipeName: pipe.name,
        type: outputCtx.importExpr(pipe.type.reference),
        deps: dependenciesFromGlobalMetadata(pipe.type, outputCtx, reflector),
        pure: pipe.pure,
    };
    var res = compilePipeFromMetadata(metadata);
    var definitionField = outputCtx.constantPool.propertyNameOf(3 /* Pipe */);
    outputCtx.statements.push(new o.ClassStmt(
    /* name */ name, 
    /* parent */ null, 
    /* fields */ [new o.ClassField(
        /* name */ definitionField, 
        /* type */ o.INFERRED_TYPE, 
        /* modifiers */ [o.StmtModifier.Static], 
        /* initializer */ res.expression)], 
    /* getters */ [], 
    /* constructorMethod */ new o.ClassMethod(null, [], []), 
    /* methods */ []));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfcGlwZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFzQixjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUd4RSxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBZ0IsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdDLE9BQU8sRUFBdUIsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUcsT0FBTyxFQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQWdCbkQsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFFBQXdCO0lBQzlELElBQU0sbUJBQW1CLEdBQTBELEVBQUUsQ0FBQztJQUV0Rix3QkFBd0I7SUFDeEIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFFNUYsc0JBQXNCO0lBQ3RCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFFN0UsSUFBTSxlQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDN0MsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFDbkIsUUFBUSxFQUFFLEVBQUUsQ0FBQyxlQUFl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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZVBpcGVNZXRhZGF0YSwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlUmVmbGVjdG9yfSBmcm9tICcuLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0RlZmluaXRpb25LaW5kfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0LCBlcnJvcn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7UjNEZXBlbmRlbmN5TWV0YWRhdGEsIGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24sIGRlcGVuZGVuY2llc0Zyb21HbG9iYWxNZXRhZGF0YX0gZnJvbSAnLi9yM19mYWN0b3J5JztcbmltcG9ydCB7SWRlbnRpZmllcnMgYXMgUjN9IGZyb20gJy4vcjNfaWRlbnRpZmllcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzUGlwZU1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG4gIHBpcGVOYW1lOiBzdHJpbmc7XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW118bnVsbDtcbiAgcHVyZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM1BpcGVEZWYge1xuICBleHByZXNzaW9uOiBvLkV4cHJlc3Npb247XG4gIHR5cGU6IG8uVHlwZTtcbiAgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVQaXBlRnJvbU1ldGFkYXRhKG1ldGFkYXRhOiBSM1BpcGVNZXRhZGF0YSkge1xuICBjb25zdCBkZWZpbml0aW9uTWFwVmFsdWVzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbiwgdmFsdWU6IG8uRXhwcmVzc2lvbn1bXSA9IFtdO1xuXG4gIC8vIGUuZy4gYG5hbWU6ICdteVBpcGUnYFxuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ25hbWUnLCB2YWx1ZTogby5saXRlcmFsKG1ldGFkYXRhLnBpcGVOYW1lKSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIC8vIGUuZy4gYHR5cGU6IE15UGlwZWBcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXk6ICd0eXBlJywgdmFsdWU6IG1ldGFkYXRhLnR5cGUsIHF1b3RlZDogZmFsc2V9KTtcblxuICBjb25zdCB0ZW1wbGF0ZUZhY3RvcnkgPSBjb21waWxlRmFjdG9yeUZ1bmN0aW9uKHtcbiAgICBuYW1lOiBtZXRhZGF0YS5uYW1lLFxuICAgIHR5cGU6IG1ldGFkYXRhLnR5cGUsXG4gICAgZGVwczogbWV0YWRhdGEuZGVwcyxcbiAgICBpbmplY3RGbjogUjMuZGlyZWN0aXZlSW5qZWN0LFxuICAgIGV4dHJhU3RhdGVtZW50Rm46IG51bGwsXG4gIH0pO1xuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ2ZhY3RvcnknLCB2YWx1ZTogdGVtcGxhdGVGYWN0b3J5LmZhY3RvcnksIHF1b3RlZDogZmFsc2V9KTtcblxuICAvLyBlLmcuIGBwdXJlOiB0cnVlYFxuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ3B1cmUnLCB2YWx1ZTogby5saXRlcmFsKG1ldGFkYXRhLnB1cmUpLCBxdW90ZWQ6IGZhbHNlfSk7XG5cbiAgY29uc3QgZXhwcmVzc2lvbiA9IG8uaW1wb3J0RXhwcihSMy5kZWZpbmVQaXBlKS5jYWxsRm4oW28ubGl0ZXJhbE1hcChkZWZpbml0aW9uTWFwVmFsdWVzKV0pO1xuICBjb25zdCB0eXBlID0gbmV3IG8uRXhwcmVzc2lvblR5cGUoby5pbXBvcnRFeHByKFIzLlBpcGVEZWZXaXRoTWV0YSwgW1xuICAgIG5ldyBvLkV4cHJlc3Npb25UeXBlKG1ldGFkYXRhLnR5cGUpLFxuICAgIG5ldyBvLkV4cHJlc3Npb25UeXBlKG5ldyBvLkxpdGVyYWxFeHByKG1ldGFkYXRhLnBpcGVOYW1lKSksXG4gIF0pKTtcbiAgcmV0dXJuIHtleHByZXNzaW9uLCB0eXBlLCBzdGF0ZW1lbnRzOiB0ZW1wbGF0ZUZhY3Rvcnkuc3RhdGVtZW50c307XG59XG5cbi8qKlxuICogV3JpdGUgYSBwaXBlIGRlZmluaXRpb24gdG8gdGhlIG91dHB1dCBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVBpcGVGcm9tUmVuZGVyMihcbiAgICBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIHBpcGU6IENvbXBpbGVQaXBlTWV0YWRhdGEsIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3Rvcikge1xuICBjb25zdCBkZWZpbml0aW9uTWFwVmFsdWVzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbiwgdmFsdWU6IG8uRXhwcmVzc2lvbn1bXSA9IFtdO1xuXG4gIGNvbnN0IG5hbWUgPSBpZGVudGlmaWVyTmFtZShwaXBlLnR5cGUpO1xuICBpZiAoIW5hbWUpIHtcbiAgICByZXR1cm4gZXJyb3IoYENhbm5vdCByZXNvbHZlIHRoZSBuYW1lIG9mICR7cGlwZS50eXBlfWApO1xuICB9XG5cbiAgY29uc3QgbWV0YWRhdGE6IFIzUGlwZU1ldGFkYXRhID0ge1xuICAgIG5hbWUsXG4gICAgcGlwZU5hbWU6IHBpcGUubmFtZSxcbiAgICB0eXBlOiBvdXRwdXRDdHguaW1wb3J0RXhwcihwaXBlLnR5cGUucmVmZXJlbmNlKSxcbiAgICBkZXBzOiBkZXBlbmRlbmNpZXNGcm9tR2xvYmFsTWV0YWRhdGEocGlwZS50eXBlLCBvdXRwdXRDdHgsIHJlZmxlY3RvciksXG4gICAgcHVyZTogcGlwZS5wdXJlLFxuICB9O1xuXG4gIGNvbnN0IHJlcyA9IGNvbXBpbGVQaXBlRnJvbU1ldGFkYXRhKG1ldGFkYXRhKTtcblxuICBjb25zdCBkZWZpbml0aW9uRmllbGQgPSBvdXRwdXRDdHguY29uc3RhbnRQb29sLnByb3BlcnR5TmFtZU9mKERlZmluaXRpb25LaW5kLlBpcGUpO1xuXG4gIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2gobmV3IG8uQ2xhc3NTdG10KFxuICAgICAgLyogbmFtZSAqLyBuYW1lLFxuICAgICAgLyogcGFyZW50ICovIG51bGwsXG4gICAgICAvKiBmaWVsZHMgKi9bbmV3IG8uQ2xhc3NGaWVsZChcbiAgICAgICAgICAvKiBuYW1lICovIGRlZmluaXRpb25GaWVsZCxcbiAgICAgICAgICAvKiB0eXBlICovIG8uSU5GRVJSRURfVFlQRSxcbiAgICAgICAgICAvKiBtb2RpZmllcnMgKi9bby5TdG10TW9kaWZpZXIuU3RhdGljXSxcbiAgICAgICAgICAvKiBpbml0aWFsaXplciAqLyByZXMuZXhwcmVzc2lvbildLFxuICAgICAgLyogZ2V0dGVycyAqL1tdLFxuICAgICAgLyogY29uc3RydWN0b3JNZXRob2QgKi8gbmV3IG8uQ2xhc3NNZXRob2QobnVsbCwgW10sIFtdKSxcbiAgICAgIC8qIG1ldGhvZHMgKi9bXSkpO1xufVxuIl19