var express = require('express');
var router = express.Router();
var acces_token = require('../middleware/verify')

require('./module/alumni')(router,acces_token);
require('./module/kelas')(router,acces_token);
require('./module/analyticsJurusan/analyticsJurusan')(router,acces_token);
require('./module/kuliah')(router,acces_token);
require('./module/perusahaan')(router,acces_token);
require('./module/wirausaha')(router,acces_token);
require('./module/analyticsStatus/analyticsStatus')(router,acces_token);
require('./module/auth/auth')(router,acces_token);
require('./module/analyticsKelamin/analyticsKelamin')(router,acces_token);

module.exports = router;
