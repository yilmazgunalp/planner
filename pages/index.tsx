import Link from 'next/link'
import Layout from 'components/Layout'
import Resizable from 'components/generic/Resizable'
import { Flex, Spacer } from '@chakra-ui/react'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <Flex padding="24" width="container.xl">
      <Resizable>
        <Flex>Hello</Flex>{' '}
      </Resizable>
    </Flex>
    <Flex padding="24" width="container.xl"></Flex>
  </Layout>
)

export default IndexPage
