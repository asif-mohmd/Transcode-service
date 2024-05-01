import { ITranscodeInteractor } from "../interface/ITranscodeInteractor";
import { ITranscodeRepository } from "../interface/ITranscodeRepository";
import { FFmpegTranscoder } from "../utils/ffmpeg";


export class TranscodeInteractor implements ITranscodeInteractor{
    private repository: ITranscodeRepository;

    constructor(repository: ITranscodeRepository){
        this.repository = repository
    }

    async addFileDetails(fileName: string, instructorId: string): Promise<any> {
        console.log("ppppppppppppppppp")
        try {
          const response = await this.repository.addFileDetails(fileName, instructorId);
          return response;
        } catch (e: any) {
          console.log(e);
        }
      }

      async transcodeMedia(file: File, id: string) {
        try {
          const { filePath, fileName, outputDirectoryPath, directoryPath } =
            await FFmpegTranscoder(file);


        }catch(err){
            
        }

    }

}