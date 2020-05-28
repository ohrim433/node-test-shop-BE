module.exports = (req, res, next) => {
    try {
        const {title, type, price} = req.body;

        if (!title || title.length < 3 || !type || type.length < 3 || !price || price < 1) {
            throw new Error('new data is not valid');
        }

        next();
    } catch (e) {
        res.end(e.message);
    }
}
