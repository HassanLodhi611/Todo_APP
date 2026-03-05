const express = require("express");
const router = express.Router();
const TODO = require("../Model/model");

router.post("/", async (req, res) => {
  try {
    const newtodo = new TODO({
      text: req.body.text
    });

    const savetodo = await newtodo.save();
    res.status(201).json(savetodo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await TODO.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id",async (req,res)=>{

  try{
 const updatetodo=await TODO.findByIdAndUpdate(
  req.params.id,{text:req.body.text}
)
res.json(updatetodo);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
})

router.delete("/:id",async(req,res)=>{

  try{

    const Delete=await TODO.findByIdAndDelete(
      req.params.id
    )
    if(!Delete)
    {
      res.status(400).json({message:"To Do Not Found"});
    }

    res.json({message:"Todo Deleted Successfully"});

  }
  catch(error){
    res.status(500).json({error:error.message})
  }
})

router.put("/:id/complete",async (req,res)=>{

  try{

    const updatecomplete=await TODO.findByIdAndUpdate(req.params.id,
      { completed:true }
    )
    res.json(updatecomplete)
  }

  catch(error)
  {

    res.status(500).json({error:error.message})
  }
})

module.exports = router;   