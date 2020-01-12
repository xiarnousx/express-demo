const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class SpeakerService {

    constructor(datafile){
        this.datafile = datafile;
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        
        if (!data) return [];

        return JSON.parse(data).speakers;
    }

    async getNames() {
        const data = await  this.getData();

        return data.map((speaker) => {
            return {name: speaker.name, shortname: speaker.shortname};
        });
    }

    async getListShort() {
        const data = await this.getData();

        return data.map((speaker) => {
            return {name: speaker.name, shortname: speaker.shortname, title: speaker.title};
        });
    }    
    
    async getList() {
        const data = await this.getData();

        return data.map((speaker) => {
            return {name: speaker.name, shortname: speaker.shortname, title: speaker.title, summary: speaker.summary};
        });
    }

    async getAllArtwork() {
        const data = await this.getData();

        const artwork = data.reduce((acc, current)=>{
            if (current.artwork) {
                acc = [...acc,...current.artwork];
            }

            return acc;
        },[]);

        return artwork;
    }

    async getSpeakerByName(shortname) {
        const data = await this.getData();

        const details = data.find((speaker) => speaker.shortname === shortname);

        if (!details) return null;

        return details;
    }
}

module.exports = SpeakerService;