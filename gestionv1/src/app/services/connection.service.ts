export class ConnectionService {
    isConnected = true;
    // simulation appel http pr asynchronisme
    signIn(){
        return new Promise(
            (resole, reject) => {
                setTimeout(
                    () => {
                        this.isConnected = true;
                        resole(true);
                    }, 1000 // en ms
                );
            }
        );
    }

    signOut(){
        this.isConnected = false;  
    }
}