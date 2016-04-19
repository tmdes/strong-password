// после загрузки страницы
$(document).ready(function () {
    // создаёт объект с 2 вопросами
    var questionsCount = 2;
    var questions = new Questions(questionsCount);

    // создаёт объект пароля
    var password = new Password();

    // jQuery selectors
    var $formQuestions = $('form#questions');
    var $pPassword = $('p#password');
    var $blockPass = $('#block-password');

    // создаёт форму для ввода ответов на вопросы
    for (var i = 1; i < questionsCount; i++) {
        $formQuestions.find('.form-group:first').clone().appendTo($formQuestions);
    }

    // заполняет вопросами форму и проставляет нумерацию
    $.each($formQuestions.find('.form-group'), function (index, element) {
        $(element).find("span.input-group-addon").text(index + 1 + '.');
        $(element).find("input").attr({
            'name': index,
            'placeholder': questions.get(index)
        });
        $(element).find("button.refresh").attr({
            'name': 'question-refresh',
            'value': index
        });
    });

    // ОБРАБОТЧИКИ СОБЫТИЙ //
    // обновить вопрос в поле для ввода
    $formQuestions.on('click', 'button.refresh', function () {
        var index = $(this).val();

        // обновляет вопрос
        $(this).parent().prev('input').attr('placeholder', questions.update(index)).val('');

        // удаляет ответ
        password.deleteAnswer(index);

        // скрывает блок с паролем
        $('#block-password').slideUp(function () {
            // выводит пароль на странице
            $pPassword.text(password.getPassword());
        });

    });

    // ввод ответов
    $formQuestions.on('keyup', 'input.form-control', function (event) {
        // записывает в объект password ответ на вопрос
        var index = $(this).attr('name');
        var value = $(this).val();
        password.setAnswer(index, value);

        // генерирует пароль и записывает результат в контейнер
        // каждый символ оборачивает в span, чтобы потом их подсвечивать
        $pPassword.html('');
        $.each(password.getPassword().split(''), function (index, char) {
            $pPassword.append('<span>' + char + '</span>');
        });

        // отображает div с паролем, когда введены ответы
        var isShow = true;
        $.each($formQuestions.find('input'), function (index, input) {
            if ($(input).val().length < 2)
                isShow = false;
        });
        (isShow) ? ($blockPass.slideDown()) : ($blockPass.slideUp());
    });

    // ввести пароль
    $('button#btn-check').click(function () {
        // запрещает изменение полей с ответами и обновление вопросов
        $formQuestions.find('input').prop('readonly', true);
        $formQuestions.find('button').prop('disabled', true);

        // отображает поле для ввода пароля
        var $confirmPassDiv = $('.confirm-password-div').hide();
        // добавляем ещё 4 поля для ввода пароля
        for (var i = 2; i <= 5; i++) {
            var $currentPassDiv = $confirmPassDiv.clone();
            $currentPassDiv.find('.index').text(i + '.');
            $currentPassDiv.appendTo('#password-confirm');
        }
        // заполняет кол-во символов
        $('#password-confirm .count-symbols').text(password.getPassword().length);

        // отображает первое поле ввода
        $confirmPassDiv.first().slideDown(function () {
            // ставит фокус
            $('#password-confirm .confirm-password-div:first input').focus();
        });

        // деактивирует кнопку "проверить пароль"
        $(this).prop('disabled', true);

    });

    // ввод пароля в input
    $('#password-confirm').on('keyup', 'input', function (event) {
        // убрали все классы
        $pPassword.find('span').removeClass();

        $.each($(this).val().split(''), function (index, char) {
            // подсвечивает span красным или зелёным
            var $span = $pPassword.find('span').eq(index);
            var passChar = password.getPassword()[index];
            (passChar === char) ? ($span.addClass('green')) : ($span.addClass('red'));
        });

        // обновляет кол-во введённых символов и обрезает лишние
        var count = password.getPassword().length - $(this).val().length;
        $(this).next('.count-symbols').text(count);

        // если пароль введён правильно, блокируем текущий input и вводим новый
        if (password.getPassword() === $(this).val()) {
            $(this).next('.count-symbols').html('<span class="glyphicon glyphicon-ok text-success"></span>');
            $(this).prop('readonly', true);

            var currConfPassDiv = $(this).parent().parent().index();
            var totalConfPassDiv = $('#password-confirm .confirm-password-div').length;
            if ((currConfPassDiv + 1) < totalConfPassDiv) {
                $('#password-confirm .confirm-password-div')
                        .eq(currConfPassDiv + 1)
                        .slideDown(function () {
                            $(this).find('input').focus();
                        });
            } else {
                $('#profit').slideDown();
            }

            // снимает разукрашивание пароля
            $pPassword.find('span').removeClass();
        }
    });

    // придумать новый пароль
    $('button#gen-new-pass').on('click', function () {
        location.reload();
    });

    // END ОБРАБОТЧИКИ СОБЫТИЙ //
});