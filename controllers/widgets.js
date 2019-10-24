const getWidget = require('../services/widgets/getWidget');
const updateWidget  = require('../services/widgets/putWidget');
const deleteWidget = require('../services/widgets/deleteWidget');
const createWidget = require('../services/widgets/createWidget');



module.exports.fetch = (req, res) => getWidget.fetch(req,res);
module.exports.update = (req, res) => updateWidget.put(req, res);
module.exports.delete = (req, res) => deleteWidget.delete(req, res);
module.exports.add = (req, res) => createWidget.create(req, res);