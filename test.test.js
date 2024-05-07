import {expect} from "chai";
import request from "supertest"
import {Names, app} from "./index.js"

//this is the sample tests we will be using.
//this is the new sample comment
//checks express app now.
//samples
describe("Sample Tests",()=>{
  before(async()=>{
    await Names.deleteMany();
  })
  it("should send working when / is pinged",async()=>{
    const response = await request(app)
    .get("/");
    expect(response.body.message).to.equal('Working')
  });
  it("should add a new name",async()=>{
    const response = await request(app)
    .post("/name")
    .send({name:"Aditya"});
    expect(response.body.message).to.equal("Data added successfully");
  });
  it("should fetch the names from the DB",async()=>{
    const response = await request(app)
    .get("/names");
    expect(response.body.data).to.be.an('array');
    expect(response.body.data[0].name).to.equal('Aditya');
  })
});
