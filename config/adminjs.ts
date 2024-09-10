import { AdminJSProviderConfig, LucidResource } from '@adminjs/adonis'

import componentLoader from '../app/admin/component_loader.js'
import authProvider from '../app/admin/auth.js'
import User from '#models/user'
import Jam from '#models/jam'
import Category from '#models/category'
import Quiz from '#models/quiz'
import Question from '#models/question'
import QuestionOption from '#models/question_option'
import QuestionType from '#models/question_type'

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    componentLoader,
    resources: [
      {
        resource: new LucidResource(User, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
      {
        resource: new LucidResource(Jam, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
      {
        resource: new LucidResource(Category, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
      {
        resource: new LucidResource(Quiz, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
      {
        resource: new LucidResource(Question, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
      {
        resource: new LucidResource(QuestionOption, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
      {
        resource: new LucidResource(QuestionType, 'sqlite'),
        options: {
          navigation: null,
          properties: {
            createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
            updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          },
        },
      },
    ],
    pages: {},
    locale: {
      availableLanguages: ['en'],
      language: 'en',
    },
    branding: {
      companyName: 'www.jam',
      theme: {},
    },
    settings: {
      defaultPerPage: 20,
    },
  },
  auth: {
    enabled: true,
    provider: authProvider,
    middlewares: [],
  },
  middlewares: [],
}

export default adminjsConfig
