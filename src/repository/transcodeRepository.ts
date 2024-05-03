import { Status, Transcoder } from "../entities/transcoder";
import { Data, ITranscodeRepository } from "../interface/ITranscodeRepository";
import TranscoderModel from "../model/schema/transcoder";

export class TranscodeRepository implements ITranscodeRepository{

    async addFileDetails(
       
        fileName: string,
        instructorId: string
      ): Promise<Transcoder | any> {
        try {
            console.log("repoooooooooooooooo")
          const response = await TranscoderModel.create({
            fileName,
            status: Status.transcoding,
            instructorId,
          });
          return response;
        } catch (e: any) {
        //   throw new DBConnectionError()
        }
      }

      async updateStatus(
        id: string,
        status: Status,
        data: Data
      ): Promise<Transcoder | null> {
        try{
          console.log("kooooorepooooooooooo");
          
        const videoData = await TranscoderModel.findByIdAndUpdate(id, {
          status,
          ...data,
        });
        return videoData;
    }catch(e:any){
      throw new e
    }
      }

      async getData(id: string): Promise<Transcoder | null | any> {
        try {
          const response = await TranscoderModel.find({ instructorId: id });
          return response;
        } catch (e: any) {
          // throw new DBConnectionError()
        }
      }

}