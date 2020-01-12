const express = require('express');

const router = express.Router();

module.exports = (params) => {

    const {speakerService} = params;

    router.get('/', async (req, res, next) => {
       
        try{
            const promises = [];
            promises.push(speakerService.getListShort());
            promises.push(speakerService.getAllArtwork());
    
            const results = await Promise.all(promises);
    
            return res.render('speakers', {
                page: 'All Speakers',
                speakersList: results[0],
                artwork: results[1],
            });
        } catch(err) {
            return next(err);
        }
    });


    router.get('/:name', async (req, res, next) => {

        const details = await speakerService.getSpeakerByName(req.params.name);
        const {artwork} = details;
        return res.render('speakers/details', {
            page: req.params.name,
            details: details,
            artwork: artwork
        });
    });


    return router;
}