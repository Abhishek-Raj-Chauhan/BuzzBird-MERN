import { useState } from "react";
import NoteImgContext from "./NoteImgContext";

const NoteImgState = (props) => {
  // eslint-disable-next-line
  const [currentImageIndex, setCurrentImageIndex] = useState(-1); // Initializing with -1 to indicate no previous image
  const imageUrls = [
    "https://images.unsplash.com/photo-1708649290066-5f617003b93f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1711139279274-ddff5036591a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8",

    "https://plus.unsplash.com/premium_photo-1709901916808-19de9683437e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1711117479067-584465e4466a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1682687220777-2c60708d6889?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1682685797140-c17807f8f217?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1707343848723-bd87dea7b118?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1711039610568-80b888ae319c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1682686581556-a3f0ee0ed556?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1704236041747-615d800a8b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5MHx8fGVufDB8fHx8fA%3D%3D",

    "https://plus.unsplash.com/premium_photo-1711065404464-bf58468af60c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5Nnx8fGVufDB8fHx8fA%3D%3D",

    // Add more URLs as needed
  ];
  function generateRandomImageIndex() {}

  return (
    <NoteImgContext.Provider
      value={{ imageUrls, generateRandomImageIndex, currentImageIndex }}
    >
      {props.children}
    </NoteImgContext.Provider>
  );
};

export default NoteImgState;
