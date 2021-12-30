import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION
const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})
const logger = createLogger('Todo')

function getUploadUrl(todoId: string, bucketName: string): string {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: parseInt(urlExpiration)
    })
}

export async function generateUploadUrl(userId: string, todoId: string): Promise<String> {
    const url = getUploadUrl(todoId, bucketName)

    const attachmentUrl: string = 'https://' + this.bucketName + '.s3.amazonaws.com/' + todoId

    const options = {
        TableName: this.todosTable,
        Key: {
            userId: userId,
            todoId: todoId
        },
        UpdateExpression: "set attachmentUrl = :r",
        ExpressionAttributeValues: {
            ":r": attachmentUrl
        },
        ReturnValues: "UPDATED_NEW"
    };

    await this.docClient.update(options).promise()
    logger.info("Presigned url generated successfully ", url)

    return url;
}