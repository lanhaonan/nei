const log = require('../../util/log');
const _ = require('../../util/utility');
const NController = require('../../arch/NController');
const BisGroupService = require('../../service/BisGroupService');

class BisGroupController extends NController {
  constructor(context, next) {
    super(context, next);
    this._service = new BisGroupService(this._uid, context);
  }

  * create() {
    log.debug(
      '[API.%s.create] create',
      this.constructor.name
    );
    let rule = {
      name: {},
      respoId: {required: true, isNumber: true},
      projectId: {required: true, isNumber: true},
      description: {},
      rpcPom: {},
      rpcKey: {},
    };
    let data = this.validate(rule, 'body');

    let ret = yield this._service.create(data);
    this.setModel(ret);

    yield this.next();
  }

  * getList() {
    log.debug(
      '[API.%s.getList] getList',
      this.constructor.name
    );

    let rule = {
      pid: {required: true, isNumber: true}
    };
    let data = this.validate(rule);
    let ret = yield this._service.getListInProject(data.pid);
    this.setModel(ret);

    yield this.next();
  }

  * findDetailById() {
    log.debug(
      '[API.%s.findDetailById] findDetailById',
      this.constructor.name
    );
    let id = this._context._id;
    let ret = yield this._service.findDetailById(id);
    this.setModel(ret);

    yield this.next();
  }

  * getQuotes() {
    log.debug(
      '[API.%s.getQuotes] get quotes',
      this.constructor.name
    );
    let id = this._context._id;
    let ret = yield this._service.getQuotes(id);
    this.setModel(ret);

    yield this.next();
  }

  * update() {
    log.debug(
      '[API.%s.update] update',
      this.constructor.name
    );
    let id = this._context._id;
    let rule = {
      name: {},
      respoId: {isNumber: true},
      description: {},
      rpcPom: {},
      rpcKey: {},
    };
    let data = this.validate(rule, 'body');
    data.id = id;
    let ret = yield this._service.update(data);
    this.setModel(ret);

    yield this.next();
  }

  * remove() {
    log.debug(
      '[API.%s.remove] remove',
      this.constructor.name
    );
    _.translateParams(this._query, ['ids']);

    let ret = yield this._service.removeBatch(this._query.ids);
    this.setModel(ret);

    yield this.next();
  }

}

module.exports = BisGroupController;
