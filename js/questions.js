// объект вопросов
function Questions(quantity) {
    // количество заданных вопросов
    this._quantity = quantity;

    // хранит индексы заданных вопросов, чтобы не пересекались
    this.askedQuestionsId = [];

    // конструктор
    this._constructor();
}

// конструктор
Questions.prototype._constructor = function () {
    // если вопросов в базе меньше чем запрашивает пользователь - возвращаем ошибку
    if (this._quantity > this._questions.length) {
        console.error("Слишком много вопросов!");
        return;
    }

    // выбирает случайные вопросы из массива
    for (var i = 0; i < this._quantity; i++) {
        // случайный ID вопроса
        var randQuestionID = this._getRandomQuestionId();

        // если такой вопрос уже задавали - генерируем новый ID вопроса
        while ($.inArray(randQuestionID, this.askedQuestionsId) !== -1)
            randQuestionID = this._getRandomQuestionId();

        // добавляет в массив заданных вопросов.
        this.askedQuestionsId.push(randQuestionID);
    }
};

// список вопросов
Questions.prototype._questions = [
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

// возвращает индекс случайного вопроса
Questions.prototype._getRandomQuestionId = function () {
    return Math.floor(Math.random() * this._questions.length);
};

// возвращает вопрос по порядковому номеру
Questions.prototype.get = function (index) {
    return this._questions[this.askedQuestionsId[index]];
};

// изменяет заданный вопрос
Questions.prototype.update = function (index) {
    // генерируем новый ID
    var randQuestionID = this._getRandomQuestionId();

    // если такой вопрос уже задавали - генерируем новый ID вопроса
    while ($.inArray(randQuestionID, this.askedQuestionsId) !== -1)
        randQuestionID = this._getRandomQuestionId();

    // перезаписываем ID текущего вопроса на новый
    this.askedQuestionsId[index] = randQuestionID;

    // возвращаем текст вопроса
    return this._questions[randQuestionID];
};