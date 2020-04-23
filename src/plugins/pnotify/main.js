var Notification = function() {
    this.statuses = {
        success : 'success',
            error : 'error',
            failure : 'error',
            warning : 'error',
            info : 'info',
            danger : 'danger'
    };
    this.hidePrev = true;
    this.options = {};
};

Notification.prototype.pNotify = function(type, message) {
    if (typeof PNotify == 'undefined') {
        console.error('Warning - pnotify.min.js is not loaded.');
        return null;
    }

    var options = {
        text: (message !== undefined ? message :"Check me out. I'm in a different stack." ),
        type: this.statuses[type]
    };

    this.extendOptions(options);
    if(this.hidePrev) {
        PNotify.removeAll();
    }

    return new PNotify(this.options);
};

Notification.prototype.extendOptions = function(object) {
    this.options = _.merge(object, this.options);
};

Notification.prototype.setOptions = function(object) {
    this.options = object;
};

app.components.notification = new Notification();

