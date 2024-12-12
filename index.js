const app = require('./src/app/app');

const port = process.env.PORT || 3307;

app.listen(port, () => {
    console.log('Server is running on port', port);
});