
const jwtTokenGenerator = require('../utility/TokenGeneration');
const mailSender = require('../utility/mailSender');
let service = require('../services/note')
require('express-validator');
class noteController {
    /**
     * @function note create note function use to create note 
     * @param {*} req 
     * @param {*} res 
     */
    note(req, res) {
        req.checkBody('description', 'please add description ').isLength({ min: 1 })
        // req.checkBody('password', 'Password contain alphabetical chars and numbers')
        const errors = req.validationErrors();
        let response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)//The 422 (Unprocessable Entity) status code 
        }

        let data = {
            title: req.body.title,
            description: req.body.description,
        }
        return new Promise((resolve, reject) => {
            service.noteServices(data)
                .then(data => {
                    response.success = true
                    response.message = " note create sucessesfully"
                    response.data = data
                    resolve(res.status(200).send(response))
                })
                .catch(errors => {
                    response.success = false
                    response.message = " note does not create "
                    response.error = errors

                    reject(res.status(422).send(response))

                })
        })
    }
    /**
         * @function noteUpdate is a function use to Update  note  from database
         * @param {*} req 
         * @param {*} res 
         */
    noteUpdate(req, res) {
        //console.log("controller.....",req.param.d);
        let response = {}
        const noteData = {}
        noteData._id = req.params.noteId,//req.param._id
            noteData.title = req.body.title,
            noteData.description = req.body.description

        return new Promise((resolve, reject) => {
            service.updateServices(noteData)
                .then(data => {
                    response.success = true
                    response.message = " note update sucessesfully"
                    response.data = data
                    resolve(res.status(200).send(response))
                })
                .catch(errors => {
                    response.success = false
                    response.message = " note does not update "
                    response.error = errors
                    reject(res.status(422).send(response))

                })
        })
    }
    /**
         * @function noteDelete is a function use to Delete  note  from database
         * @param {*} req 
         * @param {*} res 
         */
    noteDelete(req, res) {
        let response = {}
        const noteData = {}
        noteData._id = req.params.noteId

        return new Promise((resolve, reject) => {
            service.deleteServices(noteData)
                .then(data => {
                    response.success = true
                    response.message = " note delete sucessesfully"
                    response.data = data
                    resolve(res.status(200).send(response))
                })
                .catch(errors => {
                    response.success = false
                    response.message = " note does not delete "
                    response.error = errors
                    reject(res.status(422).send(response))

                })
        })
    }
    /** 
         * @function allNotes is a function use to Display all  notes
         * @param {*} request 
         * @param {*} response 
         */

    allNotes(request, response) {
        let res = {}
        //call userServices methods and pass the object
        service.getAllNotesService(request, (err, data) => {
            if (err) {
                console.log(err)
                res.success = false,
                    res.err = err
                return response.status(422).send(res);
            } else {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            }
        })
    }

    isArchive(req, res) {
        let response = {}
        const noteData = {}
        noteData._id = req.params.noteId
        //console.log("notedat", noteData);

        service.archive(noteData)
            .then(data => {
                response.success = true
                response.message = " note archive successfully"
                response.data = data
                return res.status(302).send(response)//302 status code for data found
            })
            .catch(errors => {
                response.success = false
                response.message = " note does not archive "
                response.error = errors
                return res.status(422).send(response)
            })
    }

    trash(req, res) {
        let response = {}
        const noteData = {}
        noteData._id = req.params.noteId
       // console.log('noteId',noteData);
        
        service.isTrash(noteData)
            .then(data => {
                response.success = true
                response.message = "note  add in trash successfully"
                response.data = data
                return res.status(200).send(response)
            })
            .catch(error => {
                response.success = false
                response.message = "note does not add in trash "
                response.error = error
                return res.status(422).send(response)
            })
    }


    allTrash(req, response) {
        let res = {}
        const userData= req.params.userId
        console.log("request------------------",request);
        
        //call userServices methods and pass the object
        service.getAllTrash(request)
        .then(data=>{
               res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
        })
        .catch(error=>{
            res.success=false,
            res.error=error
            return response.status(422).send(res)
        })
            
        
    }
}

module.exports = new noteController();