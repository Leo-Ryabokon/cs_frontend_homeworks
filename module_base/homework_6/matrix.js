class Matrix3D {
    #coords;
    #buffer;

    constructor(coords) {
        this.#validation(coords);
        this.#coords = coords;
        this.#buffer = new Uint32Array(this.#coords.x * this.#coords.y * this.#coords.z);
    }

    get(coords) {
        this.#validation(coords);
        return this.#buffer[this.#getIndex(coords)];
    };

    set(coords, value) {
        this.#validation(coords);
        this.#buffer[this.#getIndex(coords)] = value;
    };

    #getIndex({ x, y, z }) {
        return this.#coords.x * this.#coords.y * y + this.#coords.x * x + z;
    }

    #validation(coords) {
        const isValid = new RegExp(Object.keys(coords).join(',')).test('x,y,z');
        if (!isValid) {
            throw new Error('Invalid matrix coordinates.');
        }
    }
}

const matrix = new Matrix3D({x: 10, y: 10, z: 10});

matrix.set({x: 1, y: 3, z: 2}, 10);
matrix.set({x: 2, y: 5, z: 3}, 13);
console.log(matrix.get({x: 1, y: 3, z: 2}));
console.log(matrix.get({x: 2, y: 5, z: 3}));
