class AppStateSingleton {
    dashboardColor: string;
    locale: 'en' | 'de' | 'fr';

    private constructor() {
        this.dashboardColor = 'blue';
        this.locale = 'de';
    }

    private static readonly INSTANCE = new AppStateSingleton();
    
    public static getInstance() {
        return AppStateSingleton.INSTANCE;
    } 

    public setLocale(newLocale: 'en' | 'de' | 'fr') {
        this.locale = newLocale;
    }
}


class Test {
    public static main() {
        const appState = AppStateSingleton.getInstance();
        console.log(appState);
        appState.setLocale('fr');
        console.log(appState);
    }
}

Test.main();