let model = require('../app/models/collaborator')
let noteServices= require('../services/note')

class Services {
    /**
     * @function collaboratorService is a function use to note collaborate to other user
     * @param {object} req  
     */
    collaboratorService(req) {
        console.log("req", req);
        return new Promise((resolve, reject) => {
            model.create(req)
            .then(data => {
                   console.log("daata in collabo serv ", data);
               // model.noteServices({ "noteId": data.noteId }, {"collaboratorId": data.collaboratorId}) 

                resolve(data)
            })
                .catch(err => {
                    reject(err)
                })
        })
    }

    deleteServices(data) {
        try {
            //console.log("in  services",data);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.delete({ "_id": data._id })
                    .then((data) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }


}
module.exports= new Services()    