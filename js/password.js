// объект для генерации пароля
function Password() {

    // таблица сопоставления
    var replacement = {
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

    // ответы на вопросы
    var answers = [];

    // сложность пароля, по умолчанию средняя
    var complexity = 'medium';

    // преобразует сложность пароля в кол-во символов мини-паролей
    function complStrToLength(complexity) {
        if (complexity === 'low')
            return 3;
        else if (complexity === 'medium')
            return 5;
        else if (complexity === 'hight')
            return 7;
    }

    // возвращает массив ответов
    this.getAnswers = function () {
        return answers;
    };

    // задаёт сложность пароля
    this.setComplexity = function (str) {
        var errorMsg = '.setComplexity: Допустимые значения: low, medium, hight.';
        (str === 'hight' || str === 'medium' || str === 'low') ? (complexity = str) : (console.error(errorMsg));
    };

    // даёт ответ на вопрос
    this.setAnswer = function (index, answer) {
        answers[index] = answer;
    };

    // удаляет ответ
    this.deleteAnswer = function (index) {
        delete answers[index];
    };

    // возвращает пароль в зависимости от ответов
    this.getPassword = function () {
        var password = '';
        // проходится по массиву ответов
        $.each(answers, function (answerIndex, answerVal) {
            // если значение не пустое,
            // проходится по каждому символу и заменяет в соответствии с replacement
            if (answerVal) {
                $.each(answerVal.slice(0, complStrToLength(complexity)).split(''), function (symbolIndex, symbolVal) {
                    // в нижний регистр
                    symbolVal = symbolVal.toLowerCase();

                    // Если символ замены есть в таблице - заменяем. Иначе - передаём как есть
                    password += (replacement[symbolVal]) ? (replacement[symbolVal]) : (symbolVal);
                });

                // разделяем мини-пароли 
                password += '_';
            }
        });
        // возвращаем результат (без последнего символа подчёркивания)
        return password.slice(0, -1);
    };
}