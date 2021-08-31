const fetch = require("node-fetch");
const { openSync, closeSync, appendFileSync, readFileSync } = require("fs");
const path = require("path");
const dosFile = process.env.DE_OTHER_SIDE;
const dos = require(path.resolve(dosFile));
const { tokenHeader, apiUrl } = require("../utils/requestSetup");
const { validateParamsAndBody } = require("./dungeons.middleware");
// be able to pass in a path to save the file to
// save a equippable path as well as a non-equippable

async function getItemData({filename, key}){
  const saveFile = openSync(filename, 'ar');
  const savedStuff = JSON.parse(readFileSync(saveFile));
  console.log("savedStuff: ", savedStuff);
  const headers = tokenHeader();
  const params = [
    {
      key: "name.en_US",
      value: key
    },
    {
      key: "orderby",
      value: "field1"
    }
  ];

  const url = apiUrl('data/wow/search/item', params);
  const response = await fetch(url, { headers });
  const json = await response.json();
  const results = json.results[0].data;



  if (results.name.en_US === key){
    const saveData = {};
    saveData[`${key}`] = results;

    try {
      const data = {...savedStuff, ...saveData};
      appendFileSync(saveFile, JSON.stringify(data, null, 2));
    } catch (err){
      console.error(err);
    } finally {
      closeSync(saveFile);
    }
  }
  /*
  try{


    if (results.data.is_equippable){
      const { name } = results.data;
      dos["De Other Side"][name.en_US] = results.data;

      fs.appendFileSync(path.resolve("db/json/De_Other_Side_Objs.json"), `\n\t\"${name.en_US}\": ${JSON.stringify(dos["De Other Side"][name.en_US], null, 2)},\n`);
    }else{
      const nameObj = {};
      nameObj[`${results.data.name.en_US}`] = {};
      fs.appendFileSync(path.resolve("db/json/De_Other_Side_non_equipable.json"), `${results.data.name.en_US}\n`);
    }

  }catch(err){
    console.log("error: ", err);
  }
  */
}


function read(req, res, next){
  const dungeon = res.locals.dungeonName;
  const filename = path.resolve(`data/armory/${res.locals.filename}`);

  const dosKeys = dos["De Other Side"].splice(0, 20);
  dosKeys.map((key) => setTimeout(getItemData, 500, {filename, key}));

  res.status(200).json({message: {}});
}

function getAllDungeons(req, res, next){
  res.status(200).json({message: 'This method is still to be implemented.'});
};


module.exports = {
  read: [validateParamsAndBody, read],
  getAllDungeons
}