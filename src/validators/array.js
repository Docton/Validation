import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class ObjectValidator extends AbstractValidator {

    translation (language, options, key) {
        return Validation.transactions[language].array;
    }

    test (value, options) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    compileOptions (optionsArray) {
        return {};
    }
}

export default new ObjectValidator();
