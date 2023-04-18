import Button from "./components/buttons/Button";
import Card from "./components/cards/Card";
import MainContainer from "./components/containers/MainContainer";

function App() {
  const array = [
    {
      key: 1,
      title: "Skippy",
      text: "I am beatiful, OK? rescue me now",
      cta: "rescue me",
      img: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg",
    },
    {
      key: 1,
      title: "Jürgen",
      text: "I am german, OK? i have steuernummer",
      cta: "rescue me",
      subtitle: "i love olja",
      img: "https://www.thesprucepets.com/thmb/aWULXjTWxZbCJ4GixA7JMw8K15w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1189893683-e0ff70596b3b4f0687ba573e5a671f74.jpg",
    },
  ];

  return (
    <MainContainer>
      <div className="h-full max-h-full flex-col gap-32 py-5 md:py-10 lg:py-20">
        <div className="flex h-1/2 flex-col gap-10">
          <Button>default</Button>
          <Button bg="bg-light" text="text-dark">
            light
          </Button>
          <Button bg="bg-dark" text="text-light" padding="p-5">
            dark
          </Button>
          <Button bg="bg-dark">
            <span className="text-3xl">
              <i className="fa-regular fa-user"></i>
            </span>
          </Button>
          <Button padding="px-5 py-3" shape="rounded-none">
            square button
          </Button>
        </div>
        <div className="flex h-1/2 flex-col gap-10">
          <Card
            key={1}
            title="Skippy"
            text="I am beatiful, OK? rescue me now  jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd  jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd  jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd I am beatiful, OK? rescue me now  jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd  jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd  jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd"
            cta="rescue me"
            img="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
          />
          <Card
            key={2}
            title="Jürgen"
            text="I am german OK? i have steuernummer, jksdhfasdglkfgjgfhkaslhfsdfs adsfg sdfg sjkdfg lsdg sdk glkdsfbg sdf gsdf gsdf gdsf gdfg ds gs fd"
            cta="rescue me"
            subtitle="i love olja"
            img="https://www.thesprucepets.com/thmb/aWULXjTWxZbCJ4GixA7JMw8K15w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1189893683-e0ff70596b3b4f0687ba573e5a671f74.jpg"
          />
        </div>
      </div>
    </MainContainer>
  );
}

export default App;
