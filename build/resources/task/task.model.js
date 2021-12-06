import { v4 } from 'uuid';
var Task = /** @class */ (function () {
    function Task(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? v4() : _c, _d = _b.title, title = _d === void 0 ? "title" : _d, _e = _b.order, order = _e === void 0 ? 0 : _e, _f = _b.description, description = _f === void 0 ? '' : _f, _g = _b.boardId, boardId = _g === void 0 ? '' : _g, _h = _b.userId, userId = _h === void 0 ? '' : _h, _j = _b.columnId, columnId = _j === void 0 ? '' : _j;
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
    return Task;
}());
export default Task;
;
