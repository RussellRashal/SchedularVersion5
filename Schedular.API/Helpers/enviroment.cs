using Amazon.S3;

namespace Schedular.API.Helpers
{
    public class enviroment
    {
        public const string customerName = "customerOne";
        public const string bucketName = "schedularapp/ChichesterCollege";
        public const string awsAccessKeyId = "AKIAZWWPUMNTZ6X47JHF";

        public const string awsSecretAccessKey = "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";

        public static IAmazonS3 s3Client = new AmazonS3Client(
            "AKIAZWWPUMNTZ6X47JHF", "HIthfXrI5r6HU6JkQTAQyys+3aWl80/iIzXybxBX", 
            Amazon.RegionEndpoint.EUWest2);    
    }
}