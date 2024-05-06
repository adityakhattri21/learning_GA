import {expect} from "chai";

import {sum, test} from "./index.js";

describe("Sample Tests",()=>{
    it('should return the sum of two numbers', function() {
        const result = sum(2, 3);
        expect(result).to.equal(5);
      });
    
      it('should handle negative numbers', function() {
        const result = sum(-5, 3);
        expect(result).to.equal(-2);
      });
    
      it('should handle zero values', function() {
        const result = sum(0, 0);
        expect(result).to.equal(0);
      });
      it('should handle running of test function', function() {
        const result = test();
        expect(result).to.equal('This is the test env test_dev');
      });
})