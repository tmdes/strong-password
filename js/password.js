// объект для генерации пароля
function Password() {
    // ответы на вопросы
    this._answers = [];
}

// таблица сопоставления
Password.prototype._replacement = {
    // русские
    'а': '@', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': '3', 'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': '0', 'п': 'p', 'р': 'r', 'с': '$', 'т': 't', 'у': 'y',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': '4', 'ш': 'sh', 'щ': 'sch',
    'ъ': "'", 'ы': 'i', 'ь': "'", 'э': 'e', 'ю': 'yu', 'я': 'y@',
    // английские
    'a': '@', 's': '$', 'o': '0',
    // символы
    ' ': '_'
};

// возвращает массив ответов
Password.prototype.getAnswers = function () {
    return this._answers;
};

// даёт ответ на вопрос
Password.prototype.setAnswer = function (index, answer) {
    this._answers[index] = answer;
};

// удаляет ответ
Password.prototype.deleteAnswer = function (index) {
    delete this._answers[index];
};

// возвращает пароль в зависимости от ответов
Password.prototype.getPassword = function () {
    var password = '';
    var _self = this;
    // проходится по массиву ответов
    $.each(this._answers, function (answerIndex, answerVal) {
        // если значение не пустое, проходится по каждому символу и заменяет
        if (answerVal) {
            $.each(answerVal.slice(0, 5).split(''), function (symbolIndex, symbolVal) {
                // в нижний регистр
                symbolVal = symbolVal.toLowerCase();

                // Если символ замены есть в таблице - заменяем. Иначе - передаём как есть
                password += (_self._replacement[symbolVal]) ? (_self._replacement[symbolVal]) : (symbolVal);
            });

            // разделяем мини-пароли
            password += '_';
        }
    });
    // возвращаем результат (без последнего символа подчёркивания)
    return password.slice(0, -1);
};