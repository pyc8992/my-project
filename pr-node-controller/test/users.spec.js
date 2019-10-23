const user = require('../controller/users');

describe("UserService", () => { 
    const stub = {}; 
    afterEach("stub method restore", () => user.read); 
});
    // it("update_성공", async () => { //생략... stub.update = sinon.stub(userDAO, "update").resolves(1); //생략... }); }):