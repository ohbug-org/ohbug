import initBrowser from '../src/init'
import feedback from '../src/feedback'

const apiKey = 'test_id'
const config = { apiKey }

describe('browser feedback', () => {
  beforeAll(() => {
    initBrowser(config)
  })

  it('should render feedback', () => {
    const dom = feedback()
    expect(dom).toMatchSnapshot()
  })
})
