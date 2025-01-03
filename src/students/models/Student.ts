

export default class Student {
    id: number;
    name: string;
    scores: Map<string, number>;


    constructor(id: number, name: string, scores: Map<string, number>) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }

    addScore(key:string, value: number) {
        if(this.scores.get(key) !== undefined) {
            throw new Error(`Scores for ${key} in ${this.scores.get(key)}`);
        }
        this.scores.set(key, value);
    }

}