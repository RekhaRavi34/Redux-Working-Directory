import { isEven } from "./math"

describe("isEven",()=>{
    it(" returns true when even number is given",()=>{
        const result = isEven(2);
        expect(result).toEqual(true);
    })
    
    it("returns false when even number is given",()=>{
        const result = isEven(3);
        expect(result).toEqual(false);
    })
})