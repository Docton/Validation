export default class AbstractValidator {

    implementError() {
        throw Error(
            'Please implement the flowing methods in ' +
            this.constructor.name + ' ' +
            'translation, test, compileOptions'
        );
    }

    translation (language, options, key) {
        this.implementError();
    }

    test (string, options) {
        this.implementError();
    }

    compileOptions (optionsArray) {
        this.implementError();
    }
}