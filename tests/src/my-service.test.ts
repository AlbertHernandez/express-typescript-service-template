import { MyService } from "../../src/my-service";

describe("MyService", () => {
  let myService: MyService;

  beforeEach(() => {
    myService = new MyService();
  });

  describe("sayHi", () => {
    it("should return hi", () => {
      expect(myService.sayHi()).toBe("Hi!");
    });
  });
});
