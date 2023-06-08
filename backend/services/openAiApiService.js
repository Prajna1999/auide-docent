const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



class OpenAiApiService{
    
    async postq(){
        try{

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I want you to behave like a virtual docent for a guided museum tour of Louvre museum.\nAI: Sure, I'd be happy to help. I can provide you with a virtual tour of the Louvre, and provide you with information about each piece of art that you come across. You can ask me for more information, if anything piques your interest. Would you like to get started?\nHuman: I want you to take me to Monalisa painting.\n\nAI: Ok, let's go to the Mona Lisa painting! It is located in the Italian Painting Gallery of the Louvre Museum. Let me tell you more about it: the Mona Lisa was painted by Leonardo da Vinci in the early 16th century and is one of the most famous paintings in the world. It is an oil painting on a wood panel and is considered the most valuable painting in history. Shall we continue our tour?\nHuman: Yes\nAI: Great. Let's move on to the next painting!\nHuman: Tell me more about Monalisa painting Certainly. The Mona Lisa is an oil painting on a wooden panel. It was painted by Leonardo da Vinci in the early 16th century and has been widely acclaimed for its mastery of line, light, and color. It is said to depict a woman with a slight smile and a mysterious gaze, which has captivated viewers for centuries. It is considered one of the most valuable paintings in the world.\nHuman:Tell me more dear docent!",
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });
        
          
            
            const text=response.data.choices[0].text;
        
            return text;

        }catch(error){
            console.error("Error:", error.message);
            throw error
        }
    }
}

module.exports=OpenAiApiService;