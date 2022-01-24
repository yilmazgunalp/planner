import Link from 'next/link'
import Layout from 'components/Layout'

import Resizable from 'components/3D/Resizable'
import { SplitView } from 'components/3D/SplitView'
import { Flex, Spacer } from '@chakra-ui/react'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <Flex padding="24" width="container.xl">
      <Resizable>
        <Flex>Hello</Flex>{' '}
      </Resizable>
    </Flex>
    {/* <div className="App">
      <div>
        <SplitView
          left={<div style={{ margin: '1rem' }}>Left item</div>}
          right={<div style={{ margin: '1rem' }}>Right item</div>}
        />
      </div>
    </div> */}
  </Layout>
)

export default IndexPage
