export const abilities: Abilities = {
    Aatrox: {
        P: [
            { src1: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_P1.mp4" },
            { src2: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_P1.webm" }
        ],
        Q: [
            { src1: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_Q1.mp4" },
            { src2: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_Q1.webm" }
        ],
        W: [
            { src1: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_W1.mp4" },
            { src2: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_W1.webm" }
        ],
        E: [
            { src1: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_E1.mp4" },
            { src2: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_E1.webm" }
        ],
        R: [
            { src1: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_R1.mp4" },
            { src2: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_R1.webm" }
        ]
    },
};

export interface AbilityVideo {
    src1?: string;
    src2?: string;
}

interface ChampionAbilities {
    P: AbilityVideo[];
    Q: AbilityVideo[];
    W: AbilityVideo[];
    E: AbilityVideo[];
    R: AbilityVideo[];
}

interface Abilities {
    [champion: string]: ChampionAbilities;
}

