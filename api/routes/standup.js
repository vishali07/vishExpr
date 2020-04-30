const Standup= require('../../models/standup')

module.exports= function(router){
    // GET: the 12 newest standup meeting notes
    router.get('/standup',function(req, res){
        //  res.send("hello");
       Standup.find({},(err,standup)=> {
        //    check if error was found or not
        if(err){
            res.json({success: false,message: err});  //return error msg
        }
        else{
            // check if standup were found in db
        }
        if(!standup){
            res.json({success:false,message: 'No standup found.'}); //return error of no standup found
        }
        else{
            res.json({success: true, standup:standup}); //return success and standup array
        }
       })
    })

// POST: get new meeting note document...
    router.post('/standup',function(req,res){
        let note= new Standup(req.body)
        note.save(function(err, note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })
 
// PUT
    router.put('/updateStandup',(req,res)=> {
        if(!req.body._id){
            res.json({success: false, message:'No standup id provided'});//return error msg
        }
        else{
            Standup.findOne({_id:req.body._id},(err, standup)=> {
                if(err){
                    res.json({success: false, message: 'Not a valid standup id'});//return error msg
                }
                else{
                    standup.pname= req.body.pname;
                    standup.pdesc= req.body.pdesc;
                    standup.pprice= req.body.pprice;
                    standup.mdate= req.body.mdate;
                    standup.edate= req.body.edate;
                    standup.barcode= req.body.barcode;
                    standup.save((err)=> {
                        if(err){
                            res.json({success: false, message: err});//return err msg
                        }
                        else{
                            res.json({success: true, message:'standup updated!'});//return success msg
                        }
                    })
                }
            })
        }
    }) 
    router.delete('/deleteStandup',(req,res)=> {
        // check if id was provided in parameters
        if(!req.params.id){
            res.json({success: false, message: 'no id provided'});  //return error msg
        }else{
            // check if id is found in db
            Standup.findOne({_id: req.params.id}, (err, standup)=> {
                // check if error was found
                if(err){
                    res.json({success: false, message: 'invalid id'}); //return error msg
                }else{
                    // remove the standup from db
                    standup.remove((err)=> {
                        if(err){
                            res.json({success: false, message: err}); //return errr msg
                        }
                        else{
                            res.json({success: true, message: 'standup deleted!'}); //return success msg
                        }
                    });
                }
            });
        }
    });
}
