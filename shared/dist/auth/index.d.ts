export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    baseURL: string;
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none";
            secure: true;
        };
    } | {
        defaultCookieAttributes?: undefined;
    };
    socialProviders: {
        google: {
            prompt: "select_account";
            clientId: string;
            clientSecret: string;
        };
        github: {
            clientId: string;
            clientSecret: string;
        };
        discord: {
            clientId: string;
            clientSecret: string;
        };
    };
}>;
