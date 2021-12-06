import { v4 } from 'uuid';
var Board = /** @class */ (function () {
    function Board(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? v4() : _c, _d = _b.title, title = _d === void 0 ? 'title' : _d, _e = _b.columns, columns = _e === void 0 ? [{ id: null, title: 'New column', order: 0 }] : _e;
        this.id = id;
        this.title = title;
        this.columns = columns;
        // this.columns = [];
        // columns.forEach(col => {
        //   this.columns.push(new Column({title:col.title, order:col.order}));
        // });
    }
    return Board;
}());
export default Board;
;
