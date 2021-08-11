class PokerHand {
    /**
     * Takes the string of Cards
     *
     * @param hand
     */
    constructor(hand) {
        this.hand = hand;
    }

    compareWith(hand2) {
        const hand1Details = this.getHandDetails(this.hand),
            hand2Details = this.getHandDetails(hand2.hand);

        if (hand1Details.rank === hand2Details.rank) {
            if (hand1Details.highestCardsSorting < hand1Details.highestCardsSorting) {
                return Result.LOSS
            } else if (hand1Details.highestCardsSorting > hand2Details.highestCardsSorting) {
                return Result.WIN
            } else {
                return Result.TIE
            }
        }

        return hand1Details.rank < hand2Details.rank ? Result.WIN : Result.LOSS
    }

    getHandDetails(hand) {
        const cards = hand.split(" ");
        const sortedSuits = cards.map(card => card[1].toUpperCase()).sort();

        // Faces to be sorted from highest value descending
        const sortedFaces = cards.map(card => {
            /* According to UTF-16 the letter "M" is character code 77 which we will assign to our
                lowest value (the card face of 2).
                Using these we can sort the faces (lower character code = higher face value)
             */
            return String.fromCharCode([77 - cardOrder.indexOf(card[0])]);
        }).sort();

        // If the last card is a 10 and we have both a straight and a flush we then have a royal flush
        const isTenCardLast = sortedFaces[sortedFaces.length - 1] === String.fromCharCode(69) // 69 represents E in unicode which in turn represents the face of 10
        // If the last suit entry is the same as the first, we have a flush.
        const flush = sortedSuits[0] === sortedSuits[4];
        // if the cards are all in sequence we know it is a straight
        const first = sortedFaces[0].charCodeAt(0);
        const straight = sortedFaces.every((face, index) => face.charCodeAt(0) - first === index);

        // Tallying how many of each face there is
        const counts = sortedFaces.reduce(count, {});

        function count(tally, face) {
            tally[face] = (tally[face] || 0) + 1;
            return tally;
        }

        const duplicates = Object.values(counts).reduce(count, {});

        const rank =
            (isTenCardLast && flush && straight && 1) ||
            (flush && straight && 2) ||
            (duplicates[4] && 3) ||
            (duplicates[3] && duplicates[2] && 4) ||
            (flush && 5) ||
            (straight && 6) ||
            (duplicates[3] && 7) ||
            (duplicates[2] > 1 && 8) ||
            (duplicates[2] && 9) ||
            10;

        let highestCardsSorting = sortedFaces.sort(byCountFirst).join("")

        function byCountFirst(firstElementFace, secondElementFace) {
            //Counts are in reverse order - bigger is better
            const countDiff = counts[secondElementFace] - counts[firstElementFace];

            if (countDiff) return countDiff // If counts don't match return

            return secondElementFace > firstElementFace ? -1 : secondElementFace === firstElementFace ? 0 : 1;
        }

        return { rank, highestCardsSorting }
    }
}

const cardOrder = "23456789TJQKA";

const Result = {
    WIN: 1,
    LOSS: 2,
    TIE: 3
};

