import express, { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import puppeteer, { Browser } from 'puppeteer'

// @ts-ignore
const PORT: number = +process.env.PORT || 3000

// clear tmp directory
fs.readdirSync('tmp')
  .filter(fname => fname !== '.gitkeep')
  .map(fname => path.resolve('tmp', fname))
  .forEach(path => fs.unlinkSync(path))

const launchPuppeteer = async (): Promise<Browser> => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1680, height: 1050 },
  })

  return browser
}

const app = express()

app.get('/', async (req: Request, res: Response) => {
  res.send('Puppeteer microservice')
})

app.get('/street-view-screenshot.png', async (req: Request, res: Response, next: NextFunction) => {
  const url = atob(req.query.url as string)

  if (typeof url === 'string' && (url as string).startsWith('https://www.google.com/maps/')) {
    const imagePath = path.resolve(`tmp/street-view-${Date.now()}.png`)

    const browser = await launchPuppeteer()

    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    await new Promise(resolve => setTimeout(resolve, 300))
    await page.screenshot({ path: imagePath })
    await new Promise(resolve => setTimeout(resolve, 100))
    await browser.close()

    res.sendFile(imagePath)

    setTimeout(() => {
      fs.unlink(imagePath, (err) => {
        if (err)
          console.log('Error unlink file', err)
        else
          console.log('Unlinked file', imagePath)
      })
    }, 20000)
  } else
    next(new Error('Incorrect input'))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
