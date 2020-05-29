module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        if (isNaN(id) || +id < 0) throw new Error(`id ${id} does not exist`);

        next();
    } catch (e) {
        res.end(e.message);
    }

}
