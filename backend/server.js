import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
// import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
// if (process.env.NODE_ENV === 'development') {
// dotenv.config({ path: __dirname + (process.env.ENVPATH ?? '/.env') })
// }

connectDB()

const ORIGIN = process.env.ORIGIN ?? 'http://localhost:3003'
const PORT = process.env.PORT ?? 80

const app = express()

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': ORIGIN,
    Vary: 'Origin',
  })
  next()
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// Middleware example
// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   next()
// })

// Mounting
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.get('/api/health', (req, res) => {
  res.send('API server for e-Commerce Store is healthy!')
})

app.get('*', (req, res) => {
  res.send(
    `API server for e-Commerce Store running in ${process.env.NODE_ENV ?? 'development'} on port ${PORT}...`
  )
})

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running...')
//   })
// }

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `API server for e-Commerce running in ${process.env.NODE_ENV ?? 'development'} on port ${PORT}...`
  )
)
