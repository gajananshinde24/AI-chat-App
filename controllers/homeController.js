const greetMessageController = async (req,res) => {

    const name= req.params.name;

    res.json({message: `Hello ${name} bro/sis, msg from Gajanan`})

}
const homePage = async (req,res) => {

   

    res.send("<h1>Hello world</h1>")

}
module.exports = {greetMessageController, homePage};