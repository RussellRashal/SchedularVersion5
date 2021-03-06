using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface IUserRepository
    {

      //"task" returns type task object, executes asyncrhonous on a thread
      //IEnumerable loops over a collection of classes
      // get all tasks        
      Task<IEnumerable<User>> GetUsers();
      //get an individual task 
      Task<User> GetUser(int id); 
    }
}