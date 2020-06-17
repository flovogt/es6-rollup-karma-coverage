import MyModule from "../src/MyModule.js"

describe("MyModule", () => {
    it("should return default name", () => {
        const oMyModule = new MyModule();
        assert.strictEqual(oMyModule.getText(), "DummyText");
    });
    it("should return name", () => {
        const oMyModule = new MyModule({ text: "CoolName" });
        assert.strictEqual(oMyModule.getText(), "CoolName");
    });
});