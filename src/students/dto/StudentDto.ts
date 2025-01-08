

export default class StudentDto {
    private _id: number;
    private _name: string;
    private readonly _password: number;
    private _scores: Map<string, number> = new Map<string,number>();

    constructor(id: number, name: string, password: number, scores: Map<string, number>) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._scores = scores;
    }


    get password(): number {
        return this._password;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get scores(): object {
        return this._scores;
    }
}