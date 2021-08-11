import PokerHand, { Result } from "./pokerhand.js";

test("PokerHand", () => {
    test("compareWith()", () => {
        it(`ties`, () => {
            const hand1 = new PokerHand("AC 4S 5S 8C AH");
            const hand2 = new PokerHand("4S 5S 8C AS AD");

            expect(hand1.compareWith(hand2)).toBe(Result.TIE);
        });
    });
});
