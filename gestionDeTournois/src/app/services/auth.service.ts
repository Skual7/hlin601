export class AuthService {
    isAuth = false;

    signIn(){
        // promise pour simuler l'appel http et le temps que ça prend
        return new Promise(
            (resolve, reject) => {
                setTimeout( 
                    () => {
                        this.isAuth = true; 
                        resolve(true);
                    }, 1000
                );
            }
        );
    }
    signOut(){
        this.isAuth = false;
    }
}