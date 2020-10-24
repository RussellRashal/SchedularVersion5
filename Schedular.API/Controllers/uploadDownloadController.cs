using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using Schedular.API.Helpers;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using System;
using System.Threading.Tasks;

namespace Schedular.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class uploadDownloadController : ControllerBase
    {

        [HttpPost("upload")]  
        public async void upload(IFormFile File)
        {
            using (enviroment.s3Client)
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    try
                    {
                        File.CopyTo(newMemoryStream);

                        var uploadRequest = new TransferUtilityUploadRequest
                        {
                            InputStream = newMemoryStream,
                            Key = File.FileName,
                            BucketName = enviroment.bucketName,
                            CannedACL = S3CannedACL.PublicRead
                        };

                        var fileTransferUtility = new TransferUtility(enviroment.s3Client);
                        await fileTransferUtility.UploadAsync(uploadRequest);
                        

                    }
                    catch (NullReferenceException e)
                    {
                        Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);

                    }
        
                 
                }
            }      
        }



    






       //uploading a file
        // [HttpPost("upload")]  
        // public void upload()
        // {
        //   //  s3Client = new AmazonS3Client(bucketRegion);
        //     s3Client = new AmazonS3Client("AKIAZWWPUMNTZ6X47JHF", "HIthfXrI5r6HU6JkQTAQyys+3aWl80/iIzXybxBX", Amazon.RegionEndpoint.EUWest2);
        //     UploadFileAsync().Wait();
        // }

        // private static async Task UploadFileAsync()
        // {
        //     try
        //     {
        //         var fileTransferUtility =
        //             new TransferUtility(s3Client);

        //         // Option 1. Upload a file. The file name is used as the object key name.
        //         await fileTransferUtility.UploadAsync(filePath, bucketName);
        //         Console.WriteLine("Upload 1 completed");

                
        //     }
        //     catch (AmazonS3Exception e)
        //     {
        //         Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
        //     }

        // }
    }
}

       




     
