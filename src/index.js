import AbstractValidator from './AbstractValidator'
import * as validators from './validators/index'

export default class Validation {

    constructor(language = 'en') {
        this._language = language;
    }

    _thorError(...error) {
        throw new Error('Validation error ' + error.join(' '));
    }

    _validateRule(key, rules, value) {
        return new Promise(resolve => {
            rules = rules.split('|');
            let validationPromises = [];

            for (let rule in rules) {
                if (rules.hasOwnProperty(rule)) {
                    let validator = rules[rule].split(','),
                        validationEngine = validators[validator[0]];
                    if (!validationEngine) {
                        this._thorError('Validator', validator[0], 'not found.')
                    } else {
                        let options = validationEngine.compileOptions(validator),
                            validatorReturn = validationEngine.test(value, options);
                        if (!validatorReturn.constructor || validatorReturn.constructor.name !== Promise.name) {
                            validatorReturn = Promise.resolve(validatorReturn);
                        }
                        validationPromises.push(validatorReturn.then(resolvedValue => {
                            if (!resolvedValue) {
                                return validationEngine.translation(this._language, options, key);
                            }
                            return null;
                        }));
                    }
                }
            }

            Promise.all(validationPromises).then(resolvedValues => {
                let errors = [];
                for (let resolvedValue in resolvedValues) {
                    if (resolvedValues.hasOwnProperty(resolvedValue)) {
                        if (resolvedValues[resolvedValue]) {
                            errors.push(resolvedValues[resolvedValue]);
                        }
                    }
                }
                resolve(errors);
            }).catch(this._thorError)
        });
    }

    _mapKeys(keys, values) {
        let returnObject = {},
            isObject = Object.name === values.constructor.name;
        for (let key in keys) {
            if (keys.hasOwnProperty(key)) {
                if (isObject) {
                    returnObject[keys[key]] = values[keys[key]] || null;
                } else {
                    returnObject[keys[key]] = values[key] || null;
                }
            }
        }

        return returnObject;
    }

    validate(data, rules) {
        return new Promise((resolve, reject) => {
            let promiseKeys = [],
                promiseRules = [],
                hasErrors = false;

            for (let key in rules) {
                if (rules.hasOwnProperty(key)) {
                    promiseKeys.push(key);
                    promiseRules.push(this._validateRule(key, rules[key], data[key]).then((errors) => {
                        if (errors.length !== 0) hasErrors = true;
                        return errors;
                    }));
                }
            }

            Promise.all(promiseRules).then(errors => {
                if (hasErrors) {
                    reject({ errors: this._mapKeys(promiseKeys, errors) });
                } else {
                    resolve(this._mapKeys(promiseKeys, data));
                }
            }).catch(this._thorError);
        });
    }

}
Validation.AbstractValidator = AbstractValidator;
Validation.transactions = {};
