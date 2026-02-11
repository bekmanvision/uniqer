import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials for admins (SUPER_ADMIN)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email и пароль обязательны')
        }

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        })

        if (!admin) {
          throw new Error('Неверный email или пароль')
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password)

        if (!isValid) {
          throw new Error('Неверный email или пароль')
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      },
    }),
    // Google OAuth for managers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth, check if user is in Admin table
      if (account?.provider === 'google') {
        const admin = await prisma.admin.findUnique({
          where: { email: user.email || '' },
        })

        if (!admin) {
          // User not in admin list - deny access
          return false
        }

        // Attach admin data to user for JWT callback
        user.id = admin.id
        user.role = admin.role
        user.name = admin.name
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      // For Google sign-in, fetch role from database
      if (account?.provider === 'google' && token.email) {
        const admin = await prisma.admin.findUnique({
          where: { email: token.email },
        })
        if (admin) {
          token.id = admin.id
          token.role = admin.role
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

declare module 'next-auth' {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
  }
}
