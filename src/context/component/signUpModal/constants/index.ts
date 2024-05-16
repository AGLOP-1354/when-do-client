export interface OauthInfo {
    provider: string;
    backgroundColor: string;
    textColor: string;
}

export const PROVIDERS = {
    APPLE: 'APPLE',
    GOOGLE: 'GOOGLE',
    KAKAO: 'KAKAO',
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const SUPPORTED_OAUTH_INFO: OauthInfo[] = [
    {
        provider: PROVIDERS.KAKAO,
        backgroundColor: '#FAE100',
        textColor: '#222',
    } as const,
    {
        provider: PROVIDERS.APPLE,
        backgroundColor: '#000',
        textColor: '#FFF',
    } as const,
    {
        provider: PROVIDERS.GOOGLE,
        backgroundColor: '#fff',
        textColor: '#222',
        borderColor: '#989898',
    } as const,
] as const;
