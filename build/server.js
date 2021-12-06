import config from './common/config';
import app from './app';
var PORT = config.PORT || 4000;
app.listen(PORT, function () {
    return console.log("App is running on http://localhost:".concat(PORT));
});
