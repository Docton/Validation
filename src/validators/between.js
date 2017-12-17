import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class Between extends AbstractValidator {

    translation (language, options, key) {
        return Validation.transactions[language].between;
    }

    test (value, options) {
        return (typeof value === 'number' && value <= options.max && value >= options.min) ||
            (typeof value === 'string' && value.length <= options.max && value.length >= options.min);
    }

    compileOptions (optionsArray) {
        return {
            min: optionsArray[1],
            max: optionsArray[2],
        };
    }
}

export default new Between();
