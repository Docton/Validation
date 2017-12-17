import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class Max extends AbstractValidator {

    translation (language, options, key) {
        return Validation.transactions[language].max;
    }

    test (value, options) {
        return (typeof value === 'number' && value <= options.max) ||
            (typeof value === 'string' && value.length <= options.max);
    }

    compileOptions (optionsArray) {
        return {
            max: optionsArray[1],
        };
    }
}

export default new Max();
