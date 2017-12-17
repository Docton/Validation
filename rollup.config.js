import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/validation.js',
        format: 'umd',
    },
    sourcemap: true,
    plugins: [
        babel(babelrc()),
        uglify(),
    ],
    name: 'Validator',
};