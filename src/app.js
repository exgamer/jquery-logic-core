var App = function() {
    this.request = new RequestHelper();
    this.modal = new ModalHelper();
    this.response = new ResponseHelper();
    this.i18n = {
        dictionary : {},
        extend : function (object) {
            this.dictionary = $.extend(this.dictionary, object);
        }
    };
    this.components = {};
};

/**
 * Переводы
 * @param key
 * @returns {null|*}
 */
App.prototype.t = function (key) {
    if(typeof this.i18n.dictionary[key] === 'undefined') {
        return null;
    }

    return this.i18n.dictionary[key];
};

/**
 * Для модалок
 */
var ModalHelper = function() {
    this.modalClass = 'js-modal-block';
    /**
     * Шаблон для модалки
     * если задается то внешнему блокунужно поставить класс this.modalClass и {content} для подстановки html
     * @type {string}
     */
    this.template = '<div class="' + this.modalClass + ' bs-modal"><div class="bs-modal-dialog" role="document"><div class="bs-modal-content" role="document">{content}</div></div></div>';
    this.setTemplate = function (tmp) {
        this.template = tmp;
    }
};

/**
 * show modal
 * @param html
 */
ModalHelper.prototype.show = function (html) {
    $('.' + this.modalClass).modal('hide');
    $('.' + this.modalClass).remove();
    $(this.template.replace('{content}', html)).modal();
};

/**
 * Запросы
 * @constructor
 */
var RequestHelper = function() {};

/**
 * Отправка ajax
 * standard ajax params
 * @param params
 */
RequestHelper.prototype.ajax = function (params) {
    $.ajax(params);
};

/**
 * get запрос
 *
 *    app.request.get('example/try', {},
 *    {
 *               complete : function(xhr) {
 *                 $('<div>' +xhr.responseJSON.html+ '</div>').appendTo('body').modal();
 *             }
 *    );
 *
 * @param url
 * @param data
 * @param params
 */
RequestHelper.prototype.get = function (url, data, params) {
    let defaultParams = {
        url : url,
        type : "GET",
        data : data,
    };
    this.ajax($.extend(defaultParams, params));
};

/**
 * post запрос
 *    app.request.post('example/try', {'a':b},
 *    {
 *               complete : function(xhr) {
 *                 if (typeof xhr.responseJSON.form !== 'undefined') {
 *                   form.replaceWith(xhr.responseJSON.form);
 *                 }
 *
 *                 if (typeof xhr.responseJSON.notify !== 'undefined') {
 *                   form.prepend(xhr.responseJSON.notify);
 *                 }
 *
 *                 $(this).removeAttr('disabled');
 *               }
 *             }
 *    );
 *
 * @param url
 * @param data
 * @param params
 */
RequestHelper.prototype.post = function (url, data, params) {
    let defaultParams = {
        url : url,
        type : "POST",
        data : data,
    };
    this.ajax($.extend(defaultParams, params));
};

/**
 * http статусы
 */
var ResponseHelper = function() {
    /**
     * http статусы
     */
    var statuses = {
        ok : 200,
        created: 201,
        badRequest : 400,
        unauthorized: 401,
        forbidden : 403,
        notFound : 404,
        methodNotAllowed: 405,
        unprocessableEntity: 422
    };
};

/**
 * new app
 * @type {App}
 */
var app = new App();