let auth = require('./auth');

module.exports.get = async (req, res) => {
    console.log('Funkar, You are soooo authed');

    // Ring mongo, hämta items
    if (await auth.isAdmin(req.headers.authorization)) {
        // Du är admin
        res.status(200).send(['item1', 'item2']);
    } else {
        // Du är INTE admin
        res.status(403).send('No admin, no data');
    }
}