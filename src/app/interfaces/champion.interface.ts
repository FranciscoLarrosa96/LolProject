export interface ChampionData {
    data: {
      [championId: string]: {
        
          allytips: string[];
          blurb: string;
          enemytips: string[];
          id: string;
          image: { full: string };
          info: any;
          lore: string;
          name: string;
          partype: string;
          passive: {
            description: string;
            image: { full: string };
            name: string;
          };
          skins: {
            id: string;
            num: number;
            name: string;
            chromas: boolean;
          }[];
          spells: {
            description: string;
            id: string;
            image: { full: string };
            name: string;
          }[];
          title: string;
          "tags": {
            type:string
          }[];
      };
    };
  }