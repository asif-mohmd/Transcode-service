import { Status, Transcoder } from "../entities/transcoder";
import { ITranscodeRepository } from "../interface/ITranscodeRepository";
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

}