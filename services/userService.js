const User = require('../models/userModel');
const generateJWTToken = require('../utils/generateJWTToken');
const axios = require('axios')

const register = async (userData) => {
        const { name, email, phoneNumber, password } = userData;

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            phoneNumber,
            password,
        });
    
        return user;

};

const login  = async (loginCredentials) => {
    const { email, phoneNumber, password } = loginCredentials;


    let user;
    if(email) {
         user = await User.findOne({ email });
    }
    else if(phoneNumber) {
        user = await User.findOne({ phoneNumber });
    } 

    if(!user) {
        throw new Error('Invalid email or phone number');;
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new Error("Incorrect password!!!");
    }

    const payload = {
        email
    }
    const token = await generateJWTToken(payload);
    const data = {
        token,
        user
    }
    
    return data;
    
}

const getUserProfile = async (userId) => {
    const user = await User.findOne({ userId });
    if (user) {
        throw new Error('User already exists');
    }
    return user;
}

const handleQuestion = async (question) => {

    console.log("Question:- ",question);
    

   
        const input = {
            messages: [
              {
                role: "user",
                content: question,
              },
            ],
            model: "gemma-7b-it",
          }
        const response = await axios.post(`https://api.groq.com/openai/v1/chat/completions`, input, {  
            headers: {
              "Authorization": `Bearer ${process.env.GRCQ_BEARER_TOKEN}`,
              "Content-Type": "application/json"
            }
          });
    
            
          if (!response.data.choices || !response.data.choices[0].message) {
            throw new Error('Our API is not working now.. please try after some time');
          }
          console.log("response: - ",response.data.choices[0].message.content)
      
          const ans=  response.data.choices[0].message.content;
          return ans;

   

 
    
}

const updateProfile = async (userId, userData) => {
    const user = await User.findById(userId);

    if(user) {
       user.name = userData.name || user.name;
       user.email = userData.email || user.email;
       user.phoneNumber = userData.phoneNumber || user.phoneNumber;

       if(userData.password){
        user.password = userData.password;
       }

       const updateUser = await user.save();

       return updateUser;

}
} 

module.exports = { register, login, getUserProfile, handleQuestion, updateProfile }
