import { NextApiHandler } from "next";
import { GetMeDocument } from "../../graphql/queries/__generated__/user";
import { initializeApollo } from "../../lib/apolloClient";


const userRoute: NextApiHandler = async (req, res) => {
  try {
    const client = initializeApollo(null, req)
    const { data, error } = await client.query({ query: GetMeDocument })
    if (data)
      res.send({ user: data.me })
    else {
      console.log('error', error)
      res.send({ user: null })

    }
  }
  catch (error) {
    console.log('error', error)
    res.send({ user: null })
  }

};

export default userRoute;

