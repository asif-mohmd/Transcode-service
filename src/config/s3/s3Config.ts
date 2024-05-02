import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "US East (N. Virginia) us-east-1",
    credentials:{
        accessKeyId: 'AKIA4PKKJ3YHGAVSU2HT',
        secretAccessKey: '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'
    }
})