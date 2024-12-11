import { Account, Client, ID, OAuthProvider } from 'appwrite'
import conf from '../Configurations/Conf'

export class AuthService {
    client = new Client();
    account;
    googleAccount;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    //Sign up method
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount){
                return this.login({email, password})
            }
            else {
                return userAccount
            }
        }
        catch (error) {
            throw error;
        }
    }

    //Login method 
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        }
        catch (error) {
            throw error;
        }
    }

    //Login with google
    async gmailLogin(){
        try{
            return await this.account.createOAuth2Session(
                OAuthProvider.Google,
                'http://localhost:5173/',
                'http://localhost:5173/fail'
            )
        }
        catch(error){
            throw error;
        }
    }

    //getcurrent user method
    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("authservice::getCurrentUser", error);
        }

        return null;
    }

    //Logout method
    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.log("authservice::logout", error);
        }
    }
}

const authService = new AuthService();
export default authService;