using ContributesProjectServer.Models;
using ContributesProjectServer.Services;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContributesProjectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContributesController : ControllerBase
    {
        private readonly IContributeService contributeService;

        public ContributesController(IContributeService contributeService)
        {
            this.contributeService = contributeService;
        }
        // GET: api/<ContributesController>
        [HttpGet]
        public ActionResult<List<Contribute>> Get()
        {
            return contributeService.Get();
        }

        [HttpGet("{myId:int}")]
        public ActionResult<Contribute> Get(int myId)
        {
            var contribute = contributeService.Get(myId);
            if (contribute == null)
            {
                return NotFound($"Contribute with myId = {myId} not founded");
            }
            return contribute;
        }

        // POST api/<ContributesController>
        [HttpPost]
        public ActionResult<Contribute> Post([FromBody] Contribute contribute)
        {
            if (!ModelState.IsValid)
            {
                var errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(string.Join(" ", errorMessages));
            }
            contributeService.Create(contribute);
            return CreatedAtAction(nameof(Get), new { myId = contribute.MyId }, contribute);
        }
        

        // PUT api/<ContributesController>/5
        [HttpPut("{myId:int}")]
        public ActionResult Put(int myId, [FromBody] Contribute contribute)
        {
            var existingContribute = contributeService.Get(myId);
            if (existingContribute == null)
            {
                return NotFound($"Contribute with myId =  {myId} not founded");
            }
            contributeService.Update(existingContribute.Id, contribute);
            return NoContent();
        }

        //DELETE api/<ContributesController>/5
        [HttpDelete("{myId:int}")]
        public ActionResult Delete(int myId)
        {
            var contribute = contributeService.Get(myId);
            if (contribute == null)
            {
                return NotFound($"Contribute with myId = {myId} not founded");
            }
            contributeService.Remove(contribute.MyId);
            return Ok($"Contribute with myId = {myId} deleted");
        }

    }
}
