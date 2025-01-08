

export default class StudentNotPasswordDto {
    id: number;
    name: string;
    scores?: {}

    constructor(id: number, name: string, scores?: { [p: string]: number }) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }
}