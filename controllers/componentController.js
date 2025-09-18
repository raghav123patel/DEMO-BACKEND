const Collection = require("../models/collectionModel");
const Component = require("../models/componentModel");


exports.createComponent = async(req, res) => {
      try{
        const {name, code, displayName, collectionId} = req.body;
        if(!name || !code || !displayName || !collectionId){
        return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });  
     }
     const collectionExist = await Collection.findById(collectionId);
     if(!collectionExist){
        return res.status(404).json({
            success: false,
            message: "collection not found", 
        });
     }
     const componentExist = await Component.findOne({code});
     if(componentExist){
        return res.status(404).json({
            success: false,
            message: "component already exist",
        })
     }
     const createComponent = await Component.create({
        name,
        code,
        displayName,
        collectionId,
     })
     return res.status(200).json({
        success: true,
        createComponent,
        message: "component created successfully",
     })
      } catch(error) {
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Cannot create the component server error",
    });  
      }
}

exports.getAllComponents = async(req,res) => {
    try{
      const components = await Component.find({});
      return res.status(200).json({
      success: true,
      components,
      message: "all components fetched successfully",
    });
    } catch(error){
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Cannot fetch the components server error",
    });  
  }
}

exports.updateComponent = async(req, res) => {
    try {
      const {id} = req.params;
      const {name, code, displayName} = req.body;
      if(!id || !name || !code || !displayName){
        return res.status(400).json({
        success: false,
        message: "Please provide the correct component details",
      });  
      }
      const updateComponent = await Component.findByIdAndUpdate({_id: id}, {name, code, displayName},{new: true});
        return res.status(200).json({
        success: true,
        updateComponent,
        message: "component updated successfully",
    })
    } catch(error) {
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Internal Server Error cannot update the component",
    });
    } 
}
