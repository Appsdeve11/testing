
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("left arrow is missing on the first image", () => {
  const photos = [
    { caption: "Image 1", src: "image1.jpg" },
    { caption: "Image 2", src: "image2.jpg" },
    { caption: "Image 3", src: "image3.jpg" },
  ];
  const { getByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);
  
  const leftArrow = getByTestId("left-arrow");
  expect(leftArrow).not.toBeInTheDocument();
});

test("right arrow is missing on the last image", () => {
  const photos = [
    { caption: "Image 1", src: "image1.jpg" },
    { caption: "Image 2", src: "image2.jpg" },
    { caption: "Image 3", src: "image3.jpg" },
  ];
  const { getByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);
  
  const rightArrow = getByTestId("right-arrow");
  expect(rightArrow).not.toBeInTheDocument();
});

test("left and right arrows perform the same action", () => {
  const photos = [
    { caption: "Image 1", src: "image1.jpg" },
    { caption: "Image 2", src: "image2.jpg" },
    { caption: "Image 3", src: "image3.jpg" },
  ];
  const { getByTestId, getAllByRole } = render(<Carousel photos={photos} title="Test Carousel" />);
  
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");
  const card = getByTestId("card");
  
  fireEvent.click(leftArrow);
  expect(getAllByRole("heading")[0].textContent).toEqual("Image 1"); // Expecting to stay on the first image
  
  fireEvent.click(rightArrow);
  expect(getAllByRole("heading")[0].textContent).toEqual("Image 2"); // Expecting to move to the next image
  
  fireEvent.click(leftArrow);
  expect(getAllByRole("heading")[0].textContent).toEqual("Image 1"); // Expecting to move back to the previous image
  
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(getAllByRole("heading")[0].textContent).toEqual("Image 3"); // Expecting to move to the last image
});


test("renders Card component without errors", () => {
  render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
  // No assertions needed, if it renders without errors, the test will pass
});


test("matches snapshot of Card component", () => {
  const { asFragment } = render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
  expect(asFragment()).toMatchSnapshot();
});