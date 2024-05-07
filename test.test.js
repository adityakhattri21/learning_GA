import {expect} from "chai";
import request from "supertest"
import {app} from "./index.js"

//this is the sample tests we will be using.
//this is the new sample comment
//checks express app now.
describe("Sample Tests",()=>{

  it("should send working when / is pinged",async()=>{
    const response = await request(app)
    .get("/");
    expect(response.body.message).to.equal('Working')
  })
});
