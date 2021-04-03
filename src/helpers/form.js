module.exports = {
    sucess: (res, msg, status, data) => {
        res.status(status).send({
            msg,
            status,
            data
        })
    },

    error: (res, msg, status, error) => {
        res.status(status).send({
            msg,
            status,
            error
        })
    }
}