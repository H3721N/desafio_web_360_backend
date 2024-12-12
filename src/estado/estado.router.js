const router =require('express').Router();

router.get('/estado', (req, res) => {
    res.send('i am the router of estado');
});

router.get('/estado', (req, res) => {
    res.send('i am the router of estado');
});

router.post('/estado', (req, res) => {
    res.send('i am the router of estado');
});

router.put('/estado', (req, res) => {
    res.send('i am the router of estado');
});

router.delete('/estado', (req, res) => {
    res.send('i am the router of estado');
});

module.exports = router;