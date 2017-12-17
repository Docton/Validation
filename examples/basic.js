// Insert the used translations.
Validator.transactions['en'] = {
    email: 'Insert a valid email',
    object: 'Insert a valid object',
    between: 'Size out of range',
};

let validation = new Validator();
validation.validate({ test: 'test-email@gmail.com' }, { test: 'email' }).then(console.log).catch(console.error);
validation.validate({ test: 'test-email.gmail.com' }, { test: 'email|object|between,1,10' }).then(console.log).catch(console.error);
