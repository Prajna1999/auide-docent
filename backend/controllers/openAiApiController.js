// import the openAiApi service

const OpenAiApiService=require("../services/openAiApiService");

const openAiApiService=new OpenAiApiService();

exports.getResponse=async(req, res)=>{
    try{
        const data=await openAiApiService.postq();

        res.json(data);
    }catch(error){
        console.error('An error occured:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
