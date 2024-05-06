import { Status, Transcoder } from "../entities/transcoder";
import { ITranscodeInteractor } from "../interface/ITranscodeInteractor";
import { ITranscodeRepository } from "../interface/ITranscodeRepository";
import { FFmpegTranscoder } from "../utils/ffmpeg";
import { s3 } from "../config/s3/s3Config";
import { S3Params } from "../interface/custom";
import fs from "fs";
import {  PutObjectCommand } from "@aws-sdk/client-s3";
import { rimraf } from "rimraf";
import { transcriber } from "../utils/whisper-node";
import { convertToWav } from "../utils/convert-to-wav";

export class TranscodeInteractor implements ITranscodeInteractor {
  private repository: ITranscodeRepository;

  constructor(repository: ITranscodeRepository) {
    this.repository = repository;
  }

  async addFileDetails(fileName: string, instructorId: string): Promise<any> {
    console.log("ppppppppppppppppp");
    try {
      const response = await this.repository.addFileDetails(
        fileName,
        instructorId
      );
      return response;
    } catch (e: any) {
      console.log(e);
    }
  }

  async transcodeMedia(file: File, id: string) {
    try {
      const { filePath, fileName, outputDirectoryPath, directoryPath } =
        await FFmpegTranscoder(file);
      console.log(filePath, "hoooooooooooooooooooooooo", outputDirectoryPath);
      await this.repository.updateStatus(id, Status.subtitle, {
        generatedName: fileName,
      });

      // const wavFilePath = await convertToWav(filePath);
      // await transcriber(wavFilePath);
      // const vttFilePath = `${wavFilePath}.vtt`;
      await this.repository.updateStatus(id, Status.finishing, {});

      const files = fs.readdirSync(outputDirectoryPath);
      for (const file of files) {
        const filePaths = `${outputDirectoryPath}/${file}`;
        console.log(filePaths, "paaaaaaaaaaaaaaaaaaaaaaaaaaths");
        const fileStream = fs.createReadStream(filePaths);
        console.log("streammmmmmmmmmmmmmmm");
        const params: S3Params = {
          Bucket: process.env.BUCKET_NAME || "",
          Key: `media/hls/${fileName}/${file}`,
          Body: fileStream,
          ContentType: file.endsWith(".ts")
            ? "video/mp2t"
            : file.endsWith(".m3u8")
            ? "application/x-mpegURL"
            : null,
        };
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        try {
          const command = new PutObjectCommand(params);
          console.log("commmmmmmmaaaaaaaaaddddddddddddd");
          const rslt = await s3.send(command);
          // fs.unlinkSync(filePaths);
          console.log(`Uploaded ${file} to S3`);
        } catch (err) {
          throw new Error("s3 error");
        }
      }

      // const vttFileBuffer = fs.readFileSync(`${vttFilePath}`);
      // const params: S3Params = {
      //   Bucket: process.env.BUCKET_NAME || "",
      //   Key: `media/vtt/${fileName}.vtt`,
      //   Body: vttFileBuffer,
      //   ContentType: "text/vtt",
      // };
      // try {
      //   const command = new PutObjectCommand(params);
      //   const rslt = await s3.send(command);
      //   console.log(`Uploaded vtt to S3`);
      // } catch (err) {
      //   throw new Error("error while uploading vtt into s3")
      // }

      console.log(`Deleting locally saved files`);
      // rimraf.sync(outputDirectoryPath);
      // fs.unlinkSync(wavFilePath);
      // fs.unlinkSync(vttFilePath);
      // fs.unlinkSync(filePath);
      console.log(`Deleted locally saved files`);

      const videoUrl = `https://transcode-genius.s3.ap-south-1.amazonaws.com/media/hls/${fileName}/${fileName}_master.m3u8`;
      // const subtitleUrl = `https://transcode-genius.s3.ap-south-1.amazonaws.com/media/vtt/${fileName}.vtt`
     return await this.repository.updateStatus(id, Status.completed, { videoUrl });
      
    } catch (e: any) {
      await this.repository.updateStatus(id, Status.error, {});
      console.log(e);
    }
  }


  
  async getData(id: string): Promise<Transcoder | any> {
    try {
      const response = await this.repository.getData(id);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  }



}
