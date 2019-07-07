class Filter<T> {
    private items: T[];
    private specification: ISpecification<T>;

    constructor(items: T[], specification: ISpecification<T>) {
        this.items = items;
        this.specification = specification;
    }

    execute() {
        return this.items.filter((item) => {
            return this.specification.satisfiesConditions(item);
        })
    }
}

class Item {
    constructor (
        public name: string,
        public quantity: number,
    ) {}
}


interface ISpecification<I> {
    satisfiesConditions(entity: I): boolean;
}


class NameSpecification implements ISpecification<Item> {
    public constructor(
        public compareValue: string,
    ) {};

    public satisfiesConditions(item): boolean {
        if (item.name === this.compareValue) {
            return true;
        }

        return false;
    }
}

const list = [
    new Item('John Shortbread', 2),
    new Item('Evan codes', 5),
    new Item('cool Art', 3),
    new Item('red', 4),
]

const filter = new Filter<Item>(list, new NameSpecification('Evan codes'));

console.log(filter.execute());