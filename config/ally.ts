import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/api/v1/auth/google/callback',
    scopes: ['userinfo.email', 'userinfo.profile']
  }),
  github: services.github({
    clientId: env.get('GITHUB_CLIENT_ID'),
    clientSecret: env.get('GITHUB_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/api/v1/auth/github/callback',
    scopes: ['user:email', 'read:user']
  }),
  discord: services.discord({
    clientId: env.get('DISCORD_CLIENT_ID'),
    clientSecret: env.get('DISCORD_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/api/v1/auth/discord/callback',
    scopes: ['identify', 'email']
  }),
  facebook: services.facebook({
    clientId: env.get('FACEBOOK_CLIENT_ID'),
    clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/api/v1/auth/facebook/callback',
    scopes: ['public_profile', 'email']
  })
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}