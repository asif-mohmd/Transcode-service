import { ITranscodeInteractor } from "../interface/ITranscodeInteractor";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export class TranscodeController{

    private interactor: ITranscodeInteractor;

    constructor(interactor: ITranscodeInteractor){
        this.interactor = interactor
    }


    transcodeData = async(req:Request,res:Response,next:NextFunction) =>{
        try{
            console.log("lllllllllllllllllllllllll")
            const instructorData = req.cookies.instructorData;
            console.log(instructorData,"insIddd")
            const decoded: any = jwt.verify(instructorData, process.env.JWT_SECRET || "");
            const instructorId = decoded.instructorId
            console.log("koooooooooooooooooooooooooooooooooooooo",instructorId)

           

            const file: any = req.file
            const response:any = await this.interactor.addFileDetails(file?.originalname,instructorId)

            console.log(response,"ooojjjjjjjjjjjjjjjjj",response?._id)
            this.interactor.transcodeMedia(file?.buffer,response?._id)
        }catch(err){
         
        }
    }

    

    

}