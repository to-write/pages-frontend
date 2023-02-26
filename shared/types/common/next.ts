import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactNode } from 'react'
import { DefaultLayout } from '../../layout'

type ServerSideStatus<T extends GetServerSideProps> = Awaited<ReturnType<T>>

export type ServerSideProps<T extends GetServerSideProps> = ServerSideStatus<T> extends {
  props: any
}
  ? Omit<ServerSideStatus<T>['props'], 'dehydratedState'>
  : GetServerSidePropsResult<T>

export interface PageComponent<
  T extends (props: GetServerSidePropsContext) => any = never,
  L extends (...args: any) => ReactNode = typeof DefaultLayout
> {
  LayoutProps?: Omit<Parameters<L>[0], 'children'>
  Layout?: L
  (props: T extends never ? never : NonNullable<ServerSideStatus<T>['props']>): ReactNode
}
