class Temperature {
    public static KELVIN_CONSTANT: number = 273.15;

    private kelvinMeasurement: number;

    private constructor(kelvinMeasurement: number) {
        this.kelvinMeasurement = kelvinMeasurement;
    }

    public getFahrenheit() {
        return (this.kelvinMeasurement - Temperature.KELVIN_CONSTANT) * (9/5) + 32;
    }

    public getCelsius() {
        return this.kelvinMeasurement - 273.15
    }

    public static Factory = class {
        public static fromCelsius(celsius: number) {
            return new Temperature(celsius +  Temperature.KELVIN_CONSTANT);
        }

        public static fromFahrenheit(fahrenheit: number) {
            return new Temperature((fahrenheit - 32) * .5555555 + Temperature.KELVIN_CONSTANT);
        }
    }
}


const temp = Temperature.Factory.fromCelsius(37.92);
const temp1 = Temperature.Factory.fromFahrenheit(100.34);

class Tester {
    public static main() {
        console.log(temp1.getFahrenheit());
    }
}

Tester.main();