/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationStrategy } from '@angular/common';
/**
 * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * @publicApi
 */
export declare class MockLocationStrategy extends LocationStrategy {
    internalBaseHref: string;
    internalPath: string;
    internalTitle: string;
    urlChanges: string[];
    constructor();
    simulatePopState(url: string): void;
    path(includeHash?: boolean): string;
    prepareExternalUrl(internal: string): string;
    pushState(ctx: any, title: string, path: string, query: string): void;
    replaceState(ctx: any, title: string, path: string, query: string): void;
    onPopState(fn: (value: any) => void): void;
    getBaseHref(): string;
    back(): void;
    forward(): void;
}
