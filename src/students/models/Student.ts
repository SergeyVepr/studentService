

export default class Student {
    id: number;
    name: string;
    password: number;
    scores: Map<string, number> = new Map<string,number>();

    constructor(id: number, name: string, password: number, scores: Map<string, number>) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.scores = scores;

    }

    addScore(key:string, value: number) {
        if(this.scores.has(key)) {
            this.scores.set(key, value);
        } else {
            throw new Error(`Score for key "${key}" already exists:`);
        }
    }
}