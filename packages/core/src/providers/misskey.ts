import { OAuthConfig, OAuthUserConfig } from "./oauth"

export interface MisskeyProfile extends Record<string, any> {}

export default function Mastodon<P extends MisskeyProfile>(
  options: OAuthUserConfig<P> & {
    issuer: string
  }
): OAuthConfig<P> {
  return {
    id: "misskey",
    name: "Misskey",
    type: "oauth",
    authorization: `${options.issuer}/oauth/authorize?scope=read`,
    token: `${options.issuer}/oauth/token`,
    userinfo: `${options.issuer}/api/v1/accounts/verify_credentials`,
    profile(profile) {
      return {
        id: profile.id,
        name: profile.username,
        image: profile.avatar_static,
        email: null,
      }
    },
    options,
  }
}
