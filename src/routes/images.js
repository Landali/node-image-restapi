module.exports = (router) => {
    router.get('/getImages', (req, res) => {
        console.log('Retrieving images');
        return res.send({ Status: "Success" })
    })

    router.post('/saveImage', (req, res) => {
        console.log('Saving images');
        return res.send({ Status: "Success" })
    })
};