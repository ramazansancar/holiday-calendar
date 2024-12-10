import express from 'express';
import asyncHandler from "express-async-handler";
import axios from 'axios';
import cors from 'cors';

const errorMap = {
    'Given year is not supported.': 'Bu yılda veri bulunamadı.',
    'Given region is not supported.': 'Bu bölge desteklenmiyor.',
};

const colorTypes = {
    religious: 'cyan',
    government: 'red',
    observance: 'green',
    sports: 'purple',
    cultural: 'magenta',
    seasonal: 'orange',
    school: 'volcano',
    general: 'blue',
    other: 'gray',
}

const holidayPatterns = {
    religious: [/^(Ostern|Pfingsten|Karfreitag|Christi Himmelfahrt|Fronleichnam|Reformationstag|Allerheiligen)/i],
    government: [/^(1\. Mai|Tag der Arbeit|Tag der Deutschen Einheit|Internationaler Frauentag)/i],
    observance: [/^(Valentinstag|Halloween|Muttertag|Vatertag)/i],
    sports: [/^(FIFA World Cup|Olympics)/i],
    cultural: [/^(Oktoberfest|Karneval)/i],
    seasonal: [/^(Winter|Summer|Weihnachten|Weihnachtstag|Silvester|Ostern|Mittsommernacht|Erntedankfest)/i],
};

const mapErrors = (error) => errorMap[error] || error;
const getColorForType = (type) => colorTypes[type] || 'gray';

const promiseParser = async (response, location) => {
    let temp = [];
    response = response.data;
    if(response) {
        temp = Object.entries(response).map(([date, name]) => {
            if(date === null && name === null) return;
            return {
                date,
                name,
                location
            };
        })
    }
    return temp;
}

const dataParser = async (data) => {
    return data.flat().map(({ date, name, location }) => {
      const type = Object.keys(holidayPatterns).find(type => {
        return holidayPatterns[type].some(pattern => pattern.test(name));
      });
  
      if(date === null && name === null) return
      return {
        location,
        date,
        name,
        type: type || 'other',
        color: type ? getColorForType(type) : 'gray',
      };
    });
};

const fetchData = async (year, location) => {
    /*
    `https://date.nager.at/api/v3/PublicHolidays/${date.year()}/${country}`
    `https://digidates.de/api/v1/germanpublicholidays?year=${date.year()}&region=${country}`
    */
    try {
        const responses = await Promise.all([
            // Global holidays
            axios.get(`https://digidates.de/api/v1/germanpublicholidays?year=${year-1}&region=DE`).then(response => promiseParser(response, 'DE')),
            axios.get(`https://digidates.de/api/v1/germanpublicholidays?year=${year}&region=DE`).then(response => promiseParser(response, 'DE')),
            axios.get(`https://digidates.de/api/v1/germanpublicholidays?year=${year+1}&region=DE`).then(response => promiseParser(response, 'DE')),
            // Regional holidays
            (location !== 'DE') ? axios.get(`https://digidates.de/api/v1/germanpublicholidays?year=${year-1}&region=${location}`).then(response => promiseParser(response, location)) : [],
            (location !== 'DE') ? axios.get(`https://digidates.de/api/v1/germanpublicholidays?year=${year}&region=${location}`).then(response => promiseParser(response, location)) : [],
            (location !== 'DE') ? axios.get(`https://digidates.de/api/v1/germanpublicholidays?year=${year+1}&region=${location}`).then(response => promiseParser(response, location)) : [],
        ]);
        
        let data = await dataParser(responses.flat());

        return {
            status: 200,
            data
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
            if (error?.response?.status === 404) {
                return { status: 404, message: 'Data not found' };
            }
            if (error?.response?.status === 400) {
                return { status: 400, message: mapErrors(error?.response?.data?.error) };
            }
        }
        return { status: 500, message: 'Internal server error' };
    }
};

const app = express();
app.use(cors());
app.use(express.json());

app.all('*', (req, res, next) => {
    res.contentType("application/json");
    console.log('Request: ',req.method, req.path, req.body, req.query);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello from Express.js');
});

app.get('/api/dates/:year/:location/', asyncHandler(async  (req, res) => {
    let { year, location } = req.params;
    if((!year || !location) && location === null) {
        res.status(400).send({ status: 400, message: 'Year and location are required'});
    }
    if(isNaN(parseInt(year))) {
        res.status(400).send({ status: 400, message: 'Year should be a number'});
    }
    if(!['US', 'DE', 'TR'].includes((location.split('-')) ? location.split('-')[0] : location)) {
        res.status(400).send({ status: 400, message: 'Invalid location'});
    }

    const data = await fetchData(parseInt(year), location);
    res.status(200).send(data);
}));

app.listen(3001, () => {
    console.log(`Server is running on port http://localhost:3001`);
});