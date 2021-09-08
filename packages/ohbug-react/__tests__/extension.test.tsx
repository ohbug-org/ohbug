import React, { useEffect } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Ohbug from '@ohbug/browser'
import { extension as OhbugReact } from '../src/extension'

const client = Ohbug.init({ apiKey: 'YOUR_API_KEY' })
const OhbugErrorBoundary = client.use(OhbugReact, React)
const originErrorConsole = console.error

describe('test extension', () => {
  // to avoid react print error when having componentDidCatch
  // https://stackoverflow.com/questions/52096804/react-still-showing-errors-after-catching-with-errorboundary
  console.error = () => {}

  it('should render the FallbackComponent with error', async () => {
    const FallbackComponent = () => <div>FallbackComponent error</div>
    const ComponentThatMightThrowAnError = () => {
      useEffect(() => {
        throw new Error('Error')
      })
      return <div>ComponentThatMightThrowAnError</div>
    }
    render(
      <div className="App">
        <OhbugErrorBoundary FallbackComponent={<FallbackComponent />}>
          <ComponentThatMightThrowAnError />
        </OhbugErrorBoundary>
      </div>
    )
    const container = await screen.findByText('FallbackComponent error')
    expect(container.tagName).toEqual('DIV')
  })

  it('should notified with error', async () => {
    const mockSendBeacon = jest.fn()
    navigator.sendBeacon = mockSendBeacon
    interface IState {
      isThrow: boolean
    }
    interface IProps {}
    class Broken extends React.Component<IProps, IState> {
      constructor(props: IProps) {
        super(props)
        this.state = { isThrow: false }
      }

      render() {
        const { isThrow } = this.state
        if (isThrow) {
          throw new Error('Error')
        }
        return (
          <div>
            <button
              type="button"
              onClick={() => {
                this.setState({ isThrow: true })
              }}
            >
              button will render error.
            </button>
          </div>
        )
      }
    }
    render(
      <div className="App">
        <OhbugErrorBoundary>
          <Broken />
        </OhbugErrorBoundary>
      </div>
    )
    const button = await screen.findByText('button will render error.')
    fireEvent.click(button)
    expect(mockSendBeacon).toBeCalledTimes(2)
  })

  afterAll(() => {
    console.error = originErrorConsole
  })
})
