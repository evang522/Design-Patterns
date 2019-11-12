interface Product {
    discriminator: 'poster' | 'card';
    [additionalProperties: string] : any;
}


class ProductFactory {
    private product: Product;

    public constructor(product: Product) {
        this.product = product;
    }

    public getClass() {
        if (this.product.discriminator === 'poster') {
            return new Poster(
                this.product.subject,
                this.product.size,
            );
        }

        if (this.product.discriminator === 'card') {
            return new Card(
                this.product.mailingCost,
                this.product.color,
            );
        }

        throw new Error('Unknown Product type.');
    }

}

class Poster {
    public discriminator = 'poster';
    constructor(
        public subject: string,
        public size: number,
    ) {}
}

class Card {
    public discriminator = 'poster';
    constructor(
        public mailingCost: number,
        public color: string,
    ) {}
}



interface IPoster extends Product {
    discriminator: 'poster';
    size: number;
    subject: string;
}

interface ICard extends Product {
    discriminator: 'card';
    mailingCost: number;
    color: string;
}