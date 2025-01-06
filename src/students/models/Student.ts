

export default class Student {
    id: number;
    name: string;
    password: number;
    scores: Map<string, number> = new Map();
    test: string = "hello";

    constructor(id: number, name: string, password: number, scores: Map<string, number>) {
        this.id = id;
        this.name = name;
        this.password = password;
        // this.scores = scores;
        this.scores.set("eng", 100);
    }

    addScore(key:string, value: number) {
        if(this.scores!.get(key) !== undefined) {
            throw new Error(`Scores for ${key} in ${this.scores!.get(key)}`);
        }
        this.scores!.set(key, value);
    }
}