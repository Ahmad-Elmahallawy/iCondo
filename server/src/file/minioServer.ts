import {Injectable, Req, Res} from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioServer {
    minioClient = new Minio.Client({
        endPoint: 'devstoragecondos.happyfir.com',
        port: 443,
        accessKey: "9ZkKfhheVo0E6A9qWNfy",
        secretKey: "smYP4OnX7JmI1PdogGiIzzKFaH7vTu2nqQnarG58",
        useSSL: true
    });

    async uploadFile(bucket: string, file: any, fileName: string) {
        try {
            await this.minioClient.bucketExists(bucket).then(exists =>  {
                if (!exists) {
                    this.minioClient.makeBucket(bucket);
                }
                return;
            })
            const objInfo = await this.minioClient.putObject(bucket, fileName, file.buffer);
            console.log('File uploaded successfully:', objInfo);
            return objInfo;
        } catch (err) {
            console.error('Error uploading file:', err);
            throw err;
        }
    };

    async getFile(bucket: string, fileName: string) {
        return new Promise((resolve, reject) => {
            this.minioClient.presignedUrl('GET', bucket, fileName, 24 * 60 * 60, function (err, presignedUrl) {
                if (err) {
                    reject(err);
                } else {
                    resolve(presignedUrl);
                }
            });
        });
    };
}