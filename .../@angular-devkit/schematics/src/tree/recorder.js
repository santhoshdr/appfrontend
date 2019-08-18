"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const exception_1 = require("../exception/exception");
const update_buffer_1 = require("../utility/update-buffer");
class UpdateRecorderBase {
    constructor(entry) {
        this._original = Buffer.from(entry.content);
        this._content = new update_buffer_1.UpdateBuffer(entry.content);
        this._path = entry.path;
    }
    static createFromFileEntry(entry) {
        const c0 = entry.content.byteLength > 0 && entry.content.readUInt8(0);
        const c1 = entry.content.byteLength > 1 && entry.content.readUInt8(1);
        const c2 = entry.content.byteLength > 2 && entry.content.readUInt8(2);
        // Check if we're BOM.
        if (c0 == 0xEF && c1 == 0xBB && c2 == 0xBF) {
            return new UpdateRecorderBom(entry);
        }
        else if (c0 === 0xFF && c1 == 0xFE) {
            return new UpdateRecorderBom(entry);
        }
        else if (c0 === 0xFE && c1 == 0xFF) {
            return new UpdateRecorderBom(entry);
        }
        return new UpdateRecorderBase(entry);
    }
    get path() { return this._path; }
    // These just record changes.
    insertLeft(index, content) {
        this._content.insertLeft(index, typeof content == 'string' ? Buffer.from(content) : content);
        return this;
    }
    insertRight(index, content) {
        this._content.insertRight(index, typeof content == 'string' ? Buffer.from(content) : content);
        return this;
    }
    remove(index, length) {
        this._content.remove(index, length);
        return this;
    }
    apply(content) {
        if (!content.equals(this._content.original)) {
            throw new exception_1.ContentHasMutatedException(this.path);
        }
        return this._content.generate();
    }
}
exports.UpdateRecorderBase = UpdateRecorderBase;
class UpdateRecorderBom extends UpdateRecorderBase {
    constructor(entry, _delta = 1) {
        super(entry);
        this._delta = _delta;
    }
    insertLeft(index, content) {
        return super.insertLeft(index + this._delta, content);
    }
    insertRight(index, content) {
        return super.insertRight(index + this._delta, content);
    }
    remove(index, length) {
        return super.remove(index + this._delta, length);
    }
}
exports.UpdateRecorderBom = UpdateRecorderBom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3RyZWUvcmVjb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxzREFBb0U7QUFDcEUsNERBQXdEO0FBSXhELE1BQWEsa0JBQWtCO0lBSzdCLFlBQVksS0FBZ0I7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksNEJBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBZ0I7UUFDekMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEUsc0JBQXNCO1FBQ3RCLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxFQUFFLElBQUksSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDMUMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDcEMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDcEMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsT0FBTyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRWpDLDZCQUE2QjtJQUM3QixVQUFVLENBQUMsS0FBYSxFQUFFLE9BQXdCO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhLEVBQUUsT0FBd0I7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sSUFBSSxzQ0FBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBeERELGdEQXdEQztBQUdELE1BQWEsaUJBQWtCLFNBQVEsa0JBQWtCO0lBQ3ZELFlBQVksS0FBZ0IsRUFBVSxTQUFTLENBQUM7UUFDOUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRHVCLFdBQU0sR0FBTixNQUFNLENBQUk7SUFFaEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFhLEVBQUUsT0FBd0I7UUFDaEQsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYSxFQUFFLE9BQXdCO1FBQ2pELE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFoQkQsOENBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQ29udGVudEhhc011dGF0ZWRFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb24vZXhjZXB0aW9uJztcbmltcG9ydCB7IFVwZGF0ZUJ1ZmZlciB9IGZyb20gJy4uL3V0aWxpdHkvdXBkYXRlLWJ1ZmZlcic7XG5pbXBvcnQgeyBGaWxlRW50cnksIFVwZGF0ZVJlY29yZGVyIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVSZWNvcmRlckJhc2UgaW1wbGVtZW50cyBVcGRhdGVSZWNvcmRlciB7XG4gIHByb3RlY3RlZCBfcGF0aDogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX29yaWdpbmFsOiBCdWZmZXI7XG4gIHByb3RlY3RlZCBfY29udGVudDogVXBkYXRlQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGVudHJ5OiBGaWxlRW50cnkpIHtcbiAgICB0aGlzLl9vcmlnaW5hbCA9IEJ1ZmZlci5mcm9tKGVudHJ5LmNvbnRlbnQpO1xuICAgIHRoaXMuX2NvbnRlbnQgPSBuZXcgVXBkYXRlQnVmZmVyKGVudHJ5LmNvbnRlbnQpO1xuICAgIHRoaXMuX3BhdGggPSBlbnRyeS5wYXRoO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZyb21GaWxlRW50cnkoZW50cnk6IEZpbGVFbnRyeSk6IFVwZGF0ZVJlY29yZGVyQmFzZSB7XG4gICAgY29uc3QgYzAgPSBlbnRyeS5jb250ZW50LmJ5dGVMZW5ndGggPiAwICYmIGVudHJ5LmNvbnRlbnQucmVhZFVJbnQ4KDApO1xuICAgIGNvbnN0IGMxID0gZW50cnkuY29udGVudC5ieXRlTGVuZ3RoID4gMSAmJiBlbnRyeS5jb250ZW50LnJlYWRVSW50OCgxKTtcbiAgICBjb25zdCBjMiA9IGVudHJ5LmNvbnRlbnQuYnl0ZUxlbmd0aCA+IDIgJiYgZW50cnkuY29udGVudC5yZWFkVUludDgoMik7XG5cbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBCT00uXG4gICAgaWYgKGMwID09IDB4RUYgJiYgYzEgPT0gMHhCQiAmJiBjMiA9PSAweEJGKSB7XG4gICAgICByZXR1cm4gbmV3IFVwZGF0ZVJlY29yZGVyQm9tKGVudHJ5KTtcbiAgICB9IGVsc2UgaWYgKGMwID09PSAweEZGICYmIGMxID09IDB4RkUpIHtcbiAgICAgIHJldHVybiBuZXcgVXBkYXRlUmVjb3JkZXJCb20oZW50cnkpO1xuICAgIH0gZWxzZSBpZiAoYzAgPT09IDB4RkUgJiYgYzEgPT0gMHhGRikge1xuICAgICAgcmV0dXJuIG5ldyBVcGRhdGVSZWNvcmRlckJvbShlbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVcGRhdGVSZWNvcmRlckJhc2UoZW50cnkpO1xuICB9XG5cbiAgZ2V0IHBhdGgoKSB7IHJldHVybiB0aGlzLl9wYXRoOyB9XG5cbiAgLy8gVGhlc2UganVzdCByZWNvcmQgY2hhbmdlcy5cbiAgaW5zZXJ0TGVmdChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpOiBVcGRhdGVSZWNvcmRlciB7XG4gICAgdGhpcy5fY29udGVudC5pbnNlcnRMZWZ0KGluZGV4LCB0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGNvbnRlbnQpIDogY29udGVudCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGluc2VydFJpZ2h0KGluZGV4OiBudW1iZXIsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZyk6IFVwZGF0ZVJlY29yZGVyIHtcbiAgICB0aGlzLl9jb250ZW50Lmluc2VydFJpZ2h0KGluZGV4LCB0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGNvbnRlbnQpIDogY29udGVudCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbW92ZShpbmRleDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IFVwZGF0ZVJlY29yZGVyIHtcbiAgICB0aGlzLl9jb250ZW50LnJlbW92ZShpbmRleCwgbGVuZ3RoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYXBwbHkoY29udGVudDogQnVmZmVyKTogQnVmZmVyIHtcbiAgICBpZiAoIWNvbnRlbnQuZXF1YWxzKHRoaXMuX2NvbnRlbnQub3JpZ2luYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgQ29udGVudEhhc011dGF0ZWRFeGNlcHRpb24odGhpcy5wYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY29udGVudC5nZW5lcmF0ZSgpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVJlY29yZGVyQm9tIGV4dGVuZHMgVXBkYXRlUmVjb3JkZXJCYXNlIHtcbiAgY29uc3RydWN0b3IoZW50cnk6IEZpbGVFbnRyeSwgcHJpdmF0ZSBfZGVsdGEgPSAxKSB7XG4gICAgc3VwZXIoZW50cnkpO1xuICB9XG5cbiAgaW5zZXJ0TGVmdChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3VwZXIuaW5zZXJ0TGVmdChpbmRleCArIHRoaXMuX2RlbHRhLCBjb250ZW50KTtcbiAgfVxuXG4gIGluc2VydFJpZ2h0KGluZGV4OiBudW1iZXIsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZykge1xuICAgIHJldHVybiBzdXBlci5pbnNlcnRSaWdodChpbmRleCArIHRoaXMuX2RlbHRhLCBjb250ZW50KTtcbiAgfVxuXG4gIHJlbW92ZShpbmRleDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xuICAgIHJldHVybiBzdXBlci5yZW1vdmUoaW5kZXggKyB0aGlzLl9kZWx0YSwgbGVuZ3RoKTtcbiAgfVxufVxuIl19