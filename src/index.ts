import { Probot } from 'probot'
import app from './app'

const probot = new Probot({})
probot.load(app)
probot.start()
