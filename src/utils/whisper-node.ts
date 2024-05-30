// import * as fs from "fs";
// import path from "path";
// import { whisper } from "whisper-node-ts";

// const options = {
//   modelName: "tiny.en",
//   whisperOptions: {
//     gen_file_vtt: true, // outputs .vtt file
//   },
// };

// export const transcriber = async (filePath: string): Promise<any> => {
//   try {
//     // Transcribe audio file using whisper
//     const transcript = await whisper(filePath, options);
//     console.log("Transcription completed:", transcript);
//     return transcript;
//   } catch (err) {
//     console.error("Error during transcription:", err);
//     throw err;
//   }
// };
