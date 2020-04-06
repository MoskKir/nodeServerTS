export const server = {
    port: 3003,
    mongoDB: 'mongodb://localhost:27017/MyDb',
    clientSrcDir: process.cwd() + '../client/src/',
    publicDir: process.cwd() + '/public/',
    srcDir: process.cwd() + '/src/',
    baseDir: process.cwd() + '/data/',
};

export default server;