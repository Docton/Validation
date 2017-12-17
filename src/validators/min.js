import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class Min extends AbstractValidator {

    translation (language, options, key) {
        return Validation.transactions[language].min;
    }

    test (value, options) {
        return (typeof value === 'number' && value >= options.min) ||
            (typeof value === 'string' && value.length >= options.min);
    }

    compileOptions (optionsArray) {
        return {
            min: optionsArray[1],
        };
    }
}

export default new Min();
