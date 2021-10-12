import express from 'express';

const app = express();

app.use(express.json());

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at port: ${port}.`);
});