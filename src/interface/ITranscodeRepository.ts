export interface ITranscodeRepository {

    addFileDetails(fileName: string, instructorId: string): Promise<Object | null>;

}