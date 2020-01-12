const path = require('path');
module.exports = {
    development: {
        sitename: 'Roux Meetups [DEV]',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
        }

    },
    production: {
        sitename: 'ROUX Meetups',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
        }
    }
}