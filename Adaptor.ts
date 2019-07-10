class AmericanFlightMonitor {
    public constructor(
        private planeType: string,
        private tripDistanceInMiles: number,
        private distanceTraveledInMiles: number,
        private flightNumber: string,
    ) {}

    public remainingMilesInFlight(): number {
        return this.tripDistanceInMiles - this.distanceTraveledInMiles;
    }

    public getDistanceTravelled(): number {
        return this.distanceTraveledInMiles;
    }

    public getPlaneType() : string {
        return this.planeType;
    }

    public getStatusMetaData() : string {
        return `${this.planeType} + ${this.flightNumber}: ${this.remainingMilesInFlight()}`
    }
}


class DeutschFlightMonitor implements IDeutschFlightMonitor{
    public constructor(
        private planeType: string,
        private tripDistanceInKilometers: number,
        private distanceTraveledInKilometers: number,
        private flightNumber: string,
    ) {}

    public remainingKilometersInFlight(): number {
        return this.tripDistanceInKilometers - this.distanceTraveledInKilometers;
    }

    public getDistanceTravelled(): number {
        return this.distanceTraveledInKilometers;
    }

    public getPlaneType(): string {
        return this.planeType;
    }

    public getMetaData(): string {
        return `${this.planeType} + ${this.flightNumber}: ${this.remainingKilometersInFlight()}`
    }
}

interface IDeutschFlightMonitor {
    remainingKilometersInFlight():number;
    getDistanceTravelled(): number;
    getPlaneType() : string;
    getMetaData(): string;
}


class DeutschFlightStatusBoard {
    public constructor(
        public flights: IDeutschFlightMonitor[] = [],
    ) {}

    public addFlight(flight: IDeutschFlightMonitor): void {
        this.flights.push(flight);
    }

    
    public getTotalDistanceTravelledInKilometers(): number {
        return this.flights.reduce((accumulator, flight) => {
            return accumulator + flight.getDistanceTravelled();
        }, 0)
    } 

    public getTotalRemainingDistanceInKilometers(): number {
        return this.flights.reduce((accumulator, flight) => {
            return accumulator + flight.remainingKilometersInFlight();
        }, 0);
    }

}

class AmericanFlightMonitorAdaptor implements IDeutschFlightMonitor {
    public static MILES_KILO_CONVERSION_CONSTANT: number = 1.609;

    public constructor(
       private americanFlightMonitor: AmericanFlightMonitor
    ) {}

    private convertMilesToKilometers(mileValue: number): number {
        return mileValue * AmericanFlightMonitorAdaptor.MILES_KILO_CONVERSION_CONSTANT;
    }

    public getDistanceTravelled(): number {
        return this.convertMilesToKilometers(
            this.americanFlightMonitor.getDistanceTravelled()
        );
    }

    public getPlaneType(): string {
        return this.americanFlightMonitor.getPlaneType();
    }

    public getMetaData():string {
        return this.americanFlightMonitor.getStatusMetaData();
    }

    public remainingKilometersInFlight(): number {
        return this.convertMilesToKilometers( 
            this.americanFlightMonitor.remainingMilesInFlight()
        );
    }
}


// germanFlightBoard.addFlight(flight4);


class Demo {
    public static testDeutschFlightBoard(): void {
        const flight = new DeutschFlightMonitor('Boeing 777', 1000, 12, 'LT344A');
        const flight1 = new DeutschFlightMonitor('Airbus 380', 2000, 1200, 'CT343A');
        const flight2 = new DeutschFlightMonitor('Boeing 747', 2000, 100, 'CT343B');
        const flight3 = new DeutschFlightMonitor('Airbus 380', 2000, 100, 'DTA12');
        const flight4 = new AmericanFlightMonitor('Leerjet 400', 3000, 300, 'PRIVATE');
        const flight4Adaptor = new AmericanFlightMonitorAdaptor(flight4);
        
        
        const germanFlightBoard = new DeutschFlightStatusBoard();
        germanFlightBoard.addFlight(flight);
        germanFlightBoard.addFlight(flight1);
        germanFlightBoard.addFlight(flight2);
        germanFlightBoard.addFlight(flight3);
        germanFlightBoard.addFlight(flight4Adaptor);
        
        console.log(germanFlightBoard.getTotalRemainingDistanceInKilometers());
        console.log(germanFlightBoard.getTotalDistanceTravelledInKilometers());
    }
}

Demo.testDeutschFlightBoard();