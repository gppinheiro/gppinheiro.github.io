import terser from '@rollup/plugin-terser';

export default {
    input: 'index.js',
    output: {
        file: 'dist/index.js',
        format: 'es',
        plugins: [
            terser({
                ecma: 2023,
                module: true
            })
        ]
    }
};