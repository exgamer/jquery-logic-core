# Ajax формы

## Для того чтобы происходил ajax submit формы нужно дать форме класс js-ajax-form
```twig

{{ use('yii/widgets/ActiveForm') }}
{% set form = active_form_begin({
    'id' : 'login-form',
    'action' : path(['site/signin']),
    'enableClientValidation': false,
    'options' : {
        'class' : 'registration-form js-ajax-form'
    }
}) %}
{{ form.field(model, 'identity').textInput() | raw }}
{{ form.field(model, 'validation').passwordInput() | raw }}
{{ html.submitButton(_('frontend', 'Log in'), { 'class' : 'button' }) | raw }}
{{ active_form_end() }}

```

## Обработка в контроллере
## Ответ для ajax формы должен быть в формате json
## данные в ответе:
## form - обновит саму форму новой
## location - редирект по урл либо если location = 'reload' перезагрузит страницу
## modal - покажет контент в модальном окне
## modalTemplate -  задать шаблон модалки
```php

class SiteController extends Controller
{
    public function actionSignup()
    {
        $model = new SignUpForm();
        $model->sendMail = false;
        $model->validation = Yii::$app->security->generateRandomString(8);
        if ($model->load(Yii::$app->request->post()) && $model->validate() && $user = $this->authService()->signUp($model) ) {
            
            $responseData['modalTemplate'] = '<div class="js-modal-block bs-modal"><div class="bs-modal-dialog" role="document"><div class="bs-modal-content" role="document">{content}</div></div></div>';
            $responseData['modal'] = Yii::t('frontend', "Success registration. Check your email");
            return $this->responseJson($responseData, HttpCodeEnum::OK);
        }

        if($model->hasErrors()) {
            $code = HttpCodeEnum::UNPOCESSABLE_ENTITY;
            $responseData['errors'] = $model->getFirstErrors();
        }

        $responseData['form'] = $this->renderPartial('signup.html.twig', [
            'model' => $model
        ]);

        return $this->responseJson($responseData, $code ?? HttpCodeEnum::OK);
    }
}
```




# Ссылка для показа контента в модалке
-----------------------------------------
## даем ссылке класс js-modal-show и контент полученный с сервера будет показан в модальном окне

```twig

<a href="{{ path('/site/request-password-reset-form') }}" class="js-modal-show"> {{ _('frontend', 'Restore') }} </a>

```

## Обработка в контроллере
## Ответ для ajax формы должен быть в формате json
## данные в ответе:
## html - контент для показа
## modalTemplate -  задать шаблон модалки
```php

class SiteController extends Controller
{
    public function actionSignup()
    {
        $signUpForm = new SignUpForm();
        $html = $this->renderPartial('auth.html.twig', [
            'signInForm' => $signUpForm,
        ]);

        

        return $this->responseJson(['html' => $html]);
    }
}
```