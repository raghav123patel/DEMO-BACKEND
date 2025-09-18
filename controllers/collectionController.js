const Collection = require("../models/collectionModel");

exports.createCollection = async(req,res) => {
    try{
      const {name, code, description } = req.body;
      if(!name || !code || !description){
         return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });  
      }
      const collectionExist = await Collection.findOne({code});
      if(collectionExist){
        return res.status(400).json({
        success: false,
        message: "collection already exist",
      });   
      }
      const createCollections = await Collection.create({
        name,
        code,
        description,
      });
      return res.status(200).json({
        success: true,
        createCollections,
        message: "collection created successfully"
      })
    } catch(error) {
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Cannot create the collection server error",
    });  
    }
}

exports.getAllCollections = async(req,res) => {
    try{
      const collections = await Collection.find({});
      return res.status(200).json({
      success: true,
      collections,
      message: "all collections fetched successfully",
    });
    } catch(error){
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Cannot fetch the collection server error",
    });  
  }
}

exports.updateCollection = async(req, res) => {
    try {
      const {id} = req.params;
      const {name, code, description} = req.body;
      if(!id || !name || !code || !description){
        return res.status(400).json({
        success: false,
        message: "Please provide the correct collection details",
      });  
      }
      const updateCollection = await Collection.findByIdAndUpdate({_id: id}, {name, code, description},{new: true});
        return res.status(200).json({
        success: true,
        updateCollection,
        message: "collection updated successfully",
    })
    } catch(error) {
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Internal Server Error cannot update the collection",
    });
    } 
}

exports.deleteCollection = async(req,res) => {
    try{
      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
            success: false,
            message: "provide the id",
        })
      }
      const deleteCollections = await Collection.findByIdAndDelete(id);
      return res.status(200).json({
        success: false,
        deleteCollections,
        message: "collection deleted successfully",
      });
     } catch(error) {
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Internal Server Error cannot delete the collection",
    });
    }
}