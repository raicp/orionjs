import sleep from '../helpers/sleep'
import loop from './loop'
import {setOnExit} from '@orion-js/app'

export default async function runAgain({jobs, workers}) {
  let exited = false
  let currentLoop = null

  setOnExit(async () => {
    exited = true

    if (currentLoop) {
      await currentLoop
    }
  })

  while (!exited) {
    currentLoop = loop({jobs, workers})

    const delay = await currentLoop
    if (delay) {
      await sleep(delay)
    }
  }
}
