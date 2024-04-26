// Handler function that receives the request and response objects
module.exports = async (req, res) => {
    try {
      // Your logic here
      const data = { message: 'Hello from the serverless function!' };
      
      // Set response headers
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  
      // Return a JSON response with a success status code (200)
      res.status(200).send(JSON.stringify(data));
    } catch (error) {
      // If an error occurs, return an error response with an appropriate status code
      res.status(500).send({ error: 'An internal server error occurred' });
    }
  };