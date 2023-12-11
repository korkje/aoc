import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const cardStrengths = new Map<string, number>();
for (const [i, card] of "23456789TJQKA".split("").entries()) {
    cardStrengths.set(card, i);
}

const enum HandStrength {
    HighCard,
    Pair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

type Hand = {
    cards: string;
    strength: HandStrength;
    bid: number;
};

function handStrength(cards: string) {
    const counts = new Map<string, number>();

    for (const card of cards) {
        counts.set(card, (counts.get(card) || 0) + 1);
    }

    const values = [...counts.values()].sort((a, b) => b - a);

    if (values[0] === 5) {
        return HandStrength.FiveOfAKind;
    }
    else if (values[0] === 4) {
        return HandStrength.FourOfAKind;
    }
    else if (values[0] === 3 && values[1] === 2) {
        return HandStrength.FullHouse;
    }
    else if (values[0] === 3) {
        return HandStrength.ThreeOfAKind;
    }
    else if (values[0] === 2 && values[1] === 2) {
        return HandStrength.TwoPair;
    }
    else if (values[0] === 2) {
        return HandStrength.Pair;
    }

    return HandStrength.HighCard;
}

const hands: Hand[] = [];
for (const line of file.split("\n")) {
    const [cards, bid] = line.split(" ");
    
    hands.push({
        cards,
        strength: handStrength(cards),
        bid: parseInt(bid),
    });
}

hands.sort((a, b) => {
    if (a.strength !== b.strength) {
        return b.strength - a.strength;
    }

    for (let i = 0; i < 5; ++i) {
        if (a.cards[i] !== b.cards[i]) {
            return cardStrengths.get(b.cards[i])! - cardStrengths.get(a.cards[i])!;
        }
    }

    return 0;
});

let score = 0;
for (const [i, hand] of hands.entries()) {
    score += hand.bid * (hands.length - i);
}

const end = performance.now();

console.log("answer:", score);
console.log("time:", end - start, "ms");
