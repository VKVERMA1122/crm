const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises

const logEvent = async(message, logFileName)=>{
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n}`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '../', 'logs',
        logFileName), logItem)
    } catch (error) {
        console.log(error.message)
    }
}

const logger = (req,res,next)=>{
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method}  ${req.url}`)
    next();
}
module.exports = {logEvent, logger};