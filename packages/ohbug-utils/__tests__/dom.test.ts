import userEvent from '@testing-library/user-event'
import { getSelector } from '../src/dom'

describe('@ohbug/utils/dom', () => {
  function getDOM() {
    const div = document.createElement('div')
    div.innerHTML = `
      <button>click me</button>
    `
    return div
  }

  test('should return selector correctly', () => {
    const dom = getDOM()
    const button = dom.querySelector('button') as HTMLButtonElement
    let selector
    button.addEventListener('click', (e) => {
      selector = getSelector(e)
    })
    userEvent.click(button)

    expect(selector).toBe('div > button:nth-child(0)')
  })
})
