const { register, login, getUserProfile, handleQuestion, updateProfile } = require('../services/userService')
const asyncHandler = require('../utils/asyncHandler')


const registerUser = asyncHandler(async (req, res) => {

        const { name, email, phoneNumber, password } = req.body;
        const user = await register({ name, email, phoneNumber, password });
    
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });
    
  
})

const authUser = asyncHandler(async (req,res) => {
    
    const loginCredentials = req.body;
    const data = await login(loginCredentials);
    res.status(200).json(data);
})

const getProfile = asyncHandler(async (req, res) => {

    const userId = req.params.userId;
    const user = await getUserProfile(userId);
    res.status(200).json(user);



})

const handleQuestionController = asyncHandler(async (req,res) => {

        const question = req.body.question;
        const response = await handleQuestion(question);
        res.status(200).json(response);
   

})

const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;
    const user = await updateProfile(userId, userData)
    res.status(200).json(user);
})

module.exports =  { registerUser, authUser, getProfile, handleQuestionController, updateUserProfile }