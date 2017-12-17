import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class ObjectValidator extends AbstractValidator {

    translation (language, options, key) {
        return Validation.transactions[language].object;
    }

    test (value, options) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    compileOptions (optionsArray) {
        return {};
    }
}

export default new ObjectValidator();
