import createError from 'http-errors';
import express, { json, urlencoded,  } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

import { set, connect } from 'mongoose';
set('strictQuery', false)
const mongoDB = "mongodb+srv://teste:12345@cluster0.hy0uquc.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"

main().catch((err) => console.log(err))
async function main(){
  await connect(mongoDB)
}

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
