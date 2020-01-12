const express = require('express');

const router = express.Router();

const speakers = require('./speakers');

const feedback = require('./feedback');



module.exports = (param) => {
    const {speakerService, feedbackService} = param;

    router.get('/', async (req, res, next) => {

        try{
            const promises = [];
            promises.push(speakerService.getListShort());
            promises.push(speakerService.getAllArtwork());
    
            const results = await Promise.all(promises);
    
            return res.render('index', {
                page: 'Home',
                speakersList: results[0],
                artwork: results[1],
            });
        } catch(err) {
            return next(err);
        }

     
    });

    router.use('/speakers', speakers({speakerService}));

    router.use('/feedback', feedback({feedbackService}));

    return router;
}