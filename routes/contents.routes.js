module.exports = app =>{
    const contents = require("../controllers/contents.controller.js");

    app.get("/contents",contents.findAllContent); 
    app.delete("/contents/:id",contents.deleteContent);
   

};