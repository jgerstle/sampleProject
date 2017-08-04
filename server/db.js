var pg = require('pg'),
    Q = require('q');


function query(query, params, singleLine) {
    var deferred = Q.defer();
    var client = new pg.Client({
        user: 'postgres',
        password: 'password',
        database: 'toptal'
    });
    client.connect(function (err) {
        if (err) {
            deferred.reject(err);
        }
        client.query(query, params, function(err, result) {
            if(err)
                return deferred.reject(err);
            client.end(function(err) {
                if(err)
                    return deferred.reject(err);
                if(singleLine)
                    return deferred.resolve(result.rows[0]);
                return deferred.resolve(result.rows);
            });
        });
    });
    return deferred.promise;
}

exports.query = query;