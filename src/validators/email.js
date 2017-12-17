import AbstractValidator from '../AbstractValidator'
import Validation from '../index'

class Email extends AbstractValidator {

    constructor() {
        super();
        this._regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    translation (language, options, key) {
        return Validation.transactions[language].email;
    }

    test (value, options) {
        return this._regex.test(value.toLowerCase());
    }

    compileOptions (optionsArray) {
        return {};
    }
}

export default new Email();
