import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class StringValidator extends AbstractValidator {

    translation (language, options, key) {
        return Validation.transactions[language].string;
    }

    test (value, options) {
        return typeof value === 'string';
    }

    compileOptions (optionsArray) {
        return {};
    }
}

export default new StringValidator();
