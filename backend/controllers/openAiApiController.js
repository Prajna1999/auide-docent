// import the openAiApi service

const OpenAiApiService = require("../services/openAiApiService");

// import the supabase db instance
const supabase=require('../utils/dbConnect');

const openAiApiService = new OpenAiApiService();

exports.getResponse = async (req, res) => {
  try {
    const data = await openAiApiService.chat(req.body.message);
    // console.log(req.body.message)
    //savin data to db
    const {error}=await supabase.from('messages').insert(data);

    if(error){
      console.error('Error: ', error);
      res.status(500).json({error:'An error occured while saving data to supabase'});
    }


    // sending the fetched data to the client
    
    res.status(200).json(data);
  } catch (error) {
    console.error('An error occured:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
