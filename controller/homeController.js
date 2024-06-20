const greetMessageController = async (req,res) => {

    const name= req.params.name;

    res.json({message: `Hello ${name} bro/sis, msg from Gajanan`})

}
module.exports = {greetMessageController};