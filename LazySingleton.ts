class LazyAppStateSingleton {
    private static INSTANCE: LazyAppStateSingleton;
    dashboardColor: string;
    locale: 'en' | 'de' | 'fr';

    private constructor() {
        this.dashboardColor = 'blue';
        this.locale = 'de';
    }

    
    public static getInstance() {
        if (!LazyAppStateSingleton.INSTANCE) {
            LazyAppStateSingleton.INSTANCE = new LazyAppStateSingleton();
        }
        return LazyAppStateSingleton.INSTANCE;
    } 

    public setLocale(newLocale: 'en' | 'de' | 'fr') {
        this.locale = newLocale;
    }
}


class TestMain {
    public static main() {
        const appState = LazyAppStateSingleton.getInstance();
        console.log(appState);
        appState.setLocale('fr');
        console.log(appState);
    }
}

TestMain.main();