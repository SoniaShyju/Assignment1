const express = require('express')
const studentRoutes = require('./routes/student')
const courseRoutes = require('./routes/course')

const app = express()

app.use(express.json());

app.use('/students', studentRoutes)
app.use('/courses', courseRoutes)

const PORT = process.env.PORT || 8000;
  
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));