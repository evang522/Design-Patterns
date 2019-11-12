interface Shape {
    info(): string;
}


class Circle implements Shape {
    public radius: number;

    public constructor(radius: number)
    {
        this.radius = radius;
    }

    public resize(factor: number): void
    {
        this.radius *= factor;
    }

    public info(): string
    {
        return 'Circle';
    }
}

class Square implements Shape {
    private side: number;

    public constructor(side: number) {
        this.side = side;
    }

    public info(): string
    {
        return Square.prototype.info()
    }
}

// @decorator
class ColoredShape implements Shape {
    public constructor(
        private shape: Shape,
        private color: string
    )
    {}

    public info(): string
    {
        return 'ColoredShape'
    }
}


class TransparentShape implements Shape {
    public constructor(
        private shape: Shape,
        private transparency: number,
    )
    {}

    public info(): string
    {
        return 'TransparentShape ' + 'has' + this.transparency + ' transparency.'
    }
}


class Demo {
    public static main(): void
    {
        const circle = new Circle(10);
        console.log(circle.info());

        const blueSquare = new ColoredShape(
            new Square(20),
            'blue',
        );

        console.log(blueSquare.info());

        const transpShape = new TransparentShape(
            new ColoredShape(
                new Circle(5),
                'green',
            ), 50,
        );

        console.log(transpShape.info())
    }
}

Demo.main();