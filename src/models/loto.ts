class Loto {
    date: string;
    numbers: string;
    lotoMas: string;
    superLotoMas: string;

    constructor(date: string, numbers: string, lotoMas: string, superLotoMas: string){
        this.date = date;
        this.numbers = numbers;
        this.lotoMas = lotoMas;
        this.superLotoMas = superLotoMas;
    }
}

export default Loto;