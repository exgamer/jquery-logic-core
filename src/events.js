$(function() {
    /**
     * Событие для ajax форм
     *
     *   {% set form = active_form_begin({
     *       'id' : 'login-form',
     *       'action' : path(['site/signin']),
     *       'enableClientValidation': false,
     *       'options' : {
     *           'class' : 'registration-form js-ajax-form'
     *       }
     *   }) %}
     */
    $(document).on('submit', '.js-ajax-form', function(event) {
        event.preventDefault();
        let form = $(this);
        let url = form.attr('action');
        let data = form.serialize();
        let submit = form.find(':submit');
        $(submit).attr('disabled', 'disabled');
        app.request.post(url, data,
            {
                complete : function(xhr) {
                    if (xhr.responseJSON.modal){
                        if (typeof xhr.responseJSON.modalTemplate  !== 'undefined' ){
                            app.modal.setTemplate(xhr.responseJSON.modalTemplate);
                        }

                        app.modal.show(xhr.responseJSON.modal);
                        return;
                    }

                    if (typeof xhr.responseJSON.location !== 'undefined') {
                        if (xhr.responseJSON.location === 'reload'){
                            location.reload();
                            return;
                        }

                        location.replace(xhr.responseJSON.location);
                    }

                    if (typeof xhr.responseJSON.form !== 'undefined') {
                        form.replaceWith(xhr.responseJSON.form);
                    }

                    if (typeof xhr.responseJSON.notify !== 'undefined') {
                        form.prepend(xhr.responseJSON.notify);
                    }

                    $(submit).removeAttr('disabled');
                },
                error : function(xhr) {
                    /**
                     * @TODO вывод сообщения об ошибке
                     * после того как будет верстка
                     */
                    $(submit).removeAttr('disabled');
                }
            }
        );
    });

    /**
     * show content in modal
     */
    $(document).on('click', '.js-modal-show', function(event) {
        event.preventDefault();
        app.request.get($(this).attr('href'), {},
            {
                complete : function(xhr) {
                    if (typeof xhr.responseJSON.modalTemplate  !== 'undefined' ){
                        app.modal.setTemplate(xhr.responseJSON.modalTemplate);
                    }

                    app.modal.show(xhr.responseJSON.html);
                }
            }
        );
    });
});