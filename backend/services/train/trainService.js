const axios = require("axios");

async function searchTrains(fromCode, toCode, date) {
    const response = await axios.get(`${process.env.TRAIN_BASE_URL}/trains/between/${fromCode}/${toCode}`,
        {
            params:{
                date,
            },
            headers:{
                Authorization: `Bearer ${process.env.RAILRADAR_API_KEY}`,
            },
        }
    );

    return response.data;

};

function formatTrainList(apiData) {
  return apiData.data.trains.map((item) => ({
    number: item.train.number,
    name: item.train.name,
    departure: item.from.departure,
    arrival: item.to.arrival,
    duration: item.duration,
    type: item.train.type,
    runDays: item.train.runDays,
  }));
}


module.exports = { searchTrains,formatTrainList };