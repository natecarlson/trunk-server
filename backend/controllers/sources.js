var db = require('../db');

exports.get_sources = function(req, res) {
            db.get().collection('sources', function(err, sources_coll) {
                sources_coll.find({
                    'shortName': req.params.shortName.toLowerCase()
                }).toArray(function(err, sources_results) {
                    var sources = {};
                    for (var source in sources_results) {
                        sources[sources_results[source].srcId] = sources_results[source];
                    }
                    res.contentType('json');
                    res.send(JSON.stringify({
                        sources: sources 
                    }));
                });
            });
}
