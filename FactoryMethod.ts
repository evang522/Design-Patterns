class Tractor {
    public engine: string;
    public customizeable: boolean;
    public tireSize: number;
    public seats: number;

    private constructor(
        engine: string,
        tireSize: number,
        customizeable: boolean,
        seats: number,
    ) {
        this.engine = engine;
        this.tireSize = tireSize;
        this.customizeable = customizeable;
        this.seats = seats
    }

    public static fromTractorLiteral(tractor: Tractor) {
        return new this(
            tractor.engine,
            tractor.tireSize,
            tractor.customizeable,
            tractor.seats
        );
    }

    public static fromOrderItem(orderItem: OrderItem) {
        const {entityProperties} = orderItem;
        return new this(
            entityProperties.engine,
            entityProperties.tireSize,
            entityProperties.customizeable,
            entityProperties.seats,
        );
    }
}

interface OrderItem {
    orderItemId,
    entityProperties: {
        brand: string,
        tireSize: number,
        seats: number,
        engine: string,
        customizeable,
    }
}

interface Tractor {
    engine: string;
    customizeable: boolean;
    tireSize: number;
    seats: number;
}