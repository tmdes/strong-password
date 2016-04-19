// объект вопросов
function Questions(quantity) {
    // список вопросов
    var questions = [
        'Девичья фамилия матери',
        'Любимый город',
        'Название любимого озера',
        'Любимая книга',
        'Любимый напиток',
        'Любимое блюдо',
        'Фамилия первого учителя',
        'Любимый фильм',
        'Любимое телевизионное шоу',
        'Любимое мужское имя',
        'Любимое женское имя',
        'Любимая страна',
        'Ваш кумир'
    ];

    // хранит индексы заданных вопросов, чтобы не пересекались
    var askedQuestionsId = [];

    // возвращает индекс случайного вопроса
    function getRandomQuestionId() {
        return Math.floor(Math.random() * questions.length);
    }

    // возвращает вопрос по порядковому номеру
    this.get = function (index) {
        return questions[askedQuestionsId[index]];
    };

    // изменяет заданный вопрос
    this.update = function (index) {
        // текущий ID вопроса
        var currentQuestionID = askedQuestionsId[index];

        // генерируем новый ID
        var randQuestionID = getRandomQuestionId();

        // если такой вопрос уже задавали - генерируем новый ID вопроса
        while ($.inArray(randQuestionID, askedQuestionsId) !== - 1)
            randQuestionID = getRandomQuestionId();

        // перезаписываем ID текущего вопроса на новый
        askedQuestionsId[index] = randQuestionID;

        // возвращаем текст вопроса
        return questions[randQuestionID];
    };

    // КОНСТРУКТОР //
    // если вопросов в базе меньше чем запрашивает пользователь - возвращаем ошибку
    if (quantity > questions.length) {
        console.error("Слишком много вопросов!");
        return;
    }

    // выбирает случайные вопросы из массива
    for (var i = 0; i < quantity; i++) {
        // случайный ID вопроса
        var randQuestionID = getRandomQuestionId();

        // если такой вопрос уже задавали - генерируем новый ID вопроса
        while ($.inArray(randQuestionID, askedQuestionsId) !== - 1)
            randQuestionID = getRandomQuestionId();

        // добавляет в массив заданных вопросов.
        askedQuestionsId.push(randQuestionID);
    }
}