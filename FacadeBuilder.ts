class Person 
{
    public streetAddress: string;
    public postCode: string; 
    public city: string;
    public country: string;

    public companyName: string;
    public position: string;
    public annualIncome: number;
    
    public name: string;
    public interests: any[] = [];
    public spouse: string;
    public beliefs: any[] = [];

    toString(): string {
        return `
        ${this.name} ist ein ${this.position} bei ${this.companyName}. 
        Er/sie wohnt in ${this.city}, ${this.country}. Seine/Ihre interessen sind ${this.interests.join(', ')}.
        Er/sie glaubt an ${this.beliefs.join(', ')}.
        Er/sie ist mit ${this.spouse} verheiratet.
        `;
    }
}


class PersonBuilder {
    protected person: Person = new Person();

    public lives() {
        return new PersonAddressBuilder(this.person);
    }

    public works() {
        return new PersonJobBuilder(this.person);
    }

    public build(): Person {
        return this.person;
    }

    public is() {
        return new PersonCharacteristicsBuilder(this.person);
    }
}


class PersonAddressBuilder extends PersonBuilder {
    public person: Person;

    public constructor(person: Person) {
        super();
        this.person = person;
    }

    public at(streetAddress: string) {
        this.person.streetAddress = streetAddress;
        return this;
    }

    public in(city: string) {
        this.person.city = city;
        return this;
    }

    public inCountry(country: string) {
        this.person.country = country;
        return this;
    }

}

class PersonJobBuilder extends PersonBuilder {
    public person: Person;
    public constructor(person: Person) {
        super();
        this.person = person;
    }

    at(companyName: string) {
        this.person.companyName = companyName;
        return this;
    }

    asA(position: string) {
        this.person.position = position;
        return this;
    }

    earning(annualIncome: number) {
        this.person.annualIncome = annualIncome;
        return this;
    }
}

class PersonCharacteristicsBuilder extends PersonBuilder{
    public person: Person;
    constructor(person: Person) {
        super();
        this.person = person;
    }

    public hasBelief(belief: string) {
        this.person.beliefs.push(belief);
        return this;
    }

    public hasInterest(interest: string) {
        this.person.interests.push(interest);
        return this;
    }
    
    public isNamed(name: string) {
        this.person.name = name;
        return this;
    }

    public isMarriedTo(name: string) {
        this.person.spouse = name;
        return this;
    }
}


const pb = new PersonBuilder();

const plato = pb
    .is()
        .hasBelief('Theismus')
        .hasBelief('Formen')
        .hasInterest('Höhlen')
        .hasInterest('Philosophie')
        .hasInterest('Alles, das nicht physisch ist')
        .isMarriedTo('Unbekannt')
        .isNamed('Plato')
    .lives()
        .at('123 Greichisch Platz')
        .in('Athens')
        .inCountry('Greichenland')
    .works()
        .asA(' Philosophen')
        .at('Üniversität')
        .earning(100000)
    .build();

console.log(plato.toString());

        